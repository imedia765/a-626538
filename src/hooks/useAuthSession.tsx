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

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await Promise.allSettled([
        queryClient.resetQueries(),
        localStorage.clear(),
        supabase.auth.signOut()
      ]);
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      setSession(null);
      setLoading(false);
    }
  };

  const handleAuthError = async (error: any) => {
    console.error('Auth error:', error);
    
    const errorMessage = typeof error === 'string' ? error : error.message || error.error_description;
    const errorCode = error?.body ? JSON.parse(error.body)?.code : null;
    
    if (errorCode === 'session_not_found' || 
        errorMessage?.includes('JWT expired') ||
        errorMessage?.includes('Invalid Refresh Token') ||
        error?.status === 403) {
      console.log('Session invalid or expired, signing out...');
      await handleSignOut();
      
      toast({
        title: "Session expired",
        description: "Please sign in again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const initializeSession = async () => {
      try {
        setLoading(true);
        console.log('Checking for existing session...');
        
        const { data: { session: existingSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (mounted && existingSession?.user) {
          console.log('Found existing session for user:', existingSession.user.id);
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

    const setupAuthSubscription = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        if (!mounted) {
          console.log('Component unmounted, ignoring auth state change');
          return;
        }
        
        console.log('Auth state changed:', event, currentSession?.user?.id);
        setLoading(true);
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing session and queries');
          await handleSignOut();
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('Setting session after', event);
          try {
            const { error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;
            
            setSession(currentSession);
            if (event === 'SIGNED_IN') {
              queryClient.resetQueries();
            }
          } catch (error) {
            console.error('Error verifying user after auth state change:', error);
            await handleAuthError(error);
          }
        } else {
          setSession(currentSession);
        }
        
        setLoading(false);
      });

      authSubscription = subscription;
    };

    initializeSession();
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