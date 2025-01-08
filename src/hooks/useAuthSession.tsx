import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleAuthError = async (error: any) => {
    console.error('Auth error:', error);
    setLoading(true);
    
    const errorMessage = typeof error === 'string' ? error : error.message || error.error_description;
    
    if (errorMessage?.includes('Failed to fetch') ||
        errorMessage?.includes('session_not_found') ||
        errorMessage?.includes('JWT expired') ||
        errorMessage?.includes('Invalid Refresh Token') ||
        errorMessage?.includes('refresh_token_not_found')) {
      console.log('Session error, signing out...');
      setSession(null);
      
      try {
        await queryClient.resetQueries();
        localStorage.clear();
        await supabase.auth.signOut();
      } catch (signOutError) {
        console.error('Error during sign out:', signOutError);
      } finally {
        toast({
          title: "Session expired",
          description: "Please sign in again",
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const initializeSession = async () => {
      try {
        setLoading(true);
        console.log('Checking for existing session...');
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (mounted && existingSession?.user) {
          console.log('Found existing session for user:', existingSession.user.id);
          
          const { error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;
          
          setSession(existingSession);
        }
      } catch (error: any) {
        console.error('Session check error:', error);
        if (mounted) {
          await handleAuthError(error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeSession();

    const setupAuthSubscription = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
        if (!mounted) {
          console.log('Component unmounted, ignoring auth state change');
          return;
        }
        
        console.log('Auth state changed:', _event, currentSession?.user?.id);
        setLoading(true);
        
        if (_event === 'SIGNED_OUT') {
          console.log('User signed out, clearing session and queries');
          setSession(null);
          
          try {
            await Promise.allSettled([
              queryClient.resetQueries(),
              localStorage.clear(),
              supabase.auth.signOut()
            ]);
          } catch (error) {
            console.error('Error during sign out cleanup:', error);
          } finally {
            setLoading(false);
          }
          return;
        }

        if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
          console.log('Setting session after', _event);
          setSession(currentSession);
          if (_event === 'SIGNED_IN') {
            queryClient.resetQueries();
          }
        } else {
          setSession(currentSession);
        }
        
        setLoading(false);
      });

      authSubscription = subscription;
    };

    setupAuthSubscription();

    return () => {
      mounted = false;
      if (authSubscription) {
        try {
          authSubscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing from auth changes:', error);
        }
      }
    };
  }, [queryClient, toast]);

  return { session, loading };
};