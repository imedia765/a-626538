import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';

export const useLoginForm = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    const isMobile = window.innerWidth <= 768;
    console.log('Starting login process on device type:', isMobile ? 'mobile' : 'desktop');

    try {
      // First, verify member exists and is active
      console.log('Verifying member:', memberNumber);
      const { data: members, error: memberError } = await supabase
        .from('members')
        .select('id, member_number, status')
        .eq('member_number', memberNumber)
        .eq('status', 'active')
        .limit(1);

      if (memberError) {
        console.error('Member verification error:', memberError);
        throw memberError;
      }

      if (!members || members.length === 0) {
        throw new Error('Member not found or inactive');
      }

      const member = members[0];
      console.log('Member found:', member);

      const email = `${memberNumber.toLowerCase()}@temp.com`;
      const password = memberNumber;

      console.log('Attempting sign in with:', { email });
      
      // Try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If sign in fails due to invalid credentials, try to sign up
      if (signInError && signInError.message.includes('Invalid login credentials')) {
        console.log('Sign in failed, attempting signup');
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              member_number: memberNumber,
            }
          }
        });

        if (signUpError) {
          console.error('Signup error:', signUpError);
          throw signUpError;
        }

        if (signUpData.user) {
          console.log('Signup successful, updating member with auth_user_id');
          
          // Update member with auth_user_id
          const { error: updateError } = await supabase
            .from('members')
            .update({ auth_user_id: signUpData.user.id })
            .eq('id', member.id);

          if (updateError) {
            console.error('Error updating member with auth_user_id:', updateError);
            throw updateError;
          }

          // Add default member role
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: signUpData.user.id, role: 'member' }
            ]);

          if (roleError) {
            console.error('Error adding member role:', roleError);
            throw roleError;
          }

          console.log('Member updated and role assigned, attempting final sign in');
          
          // Final sign in attempt after successful signup
          const { data: finalSignInData, error: finalSignInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (finalSignInError) {
            console.error('Final sign in error:', finalSignInError);
            throw finalSignInError;
          }

          if (!finalSignInData?.session) {
            throw new Error('Failed to establish session after signup');
          }
        }
      } else if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      // Clear any existing queries before proceeding
      await queryClient.cancelQueries();
      await queryClient.clear();

      // Verify session is established
      console.log('Verifying session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session verification error:', sessionError);
        throw sessionError;
      }

      if (!session) {
        console.error('No session established');
        throw new Error('Failed to establish session');
      }

      console.log('Session established successfully');

      // Invalidate all queries to refresh data
      await queryClient.invalidateQueries();

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      // Use replace to prevent back button issues on mobile
      if (isMobile) {
        window.location.href = '/';
      } else {
        navigate('/', { replace: true });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // Clear any existing session
      await supabase.auth.signOut();
      
      let errorMessage = 'An unexpected error occurred';
      
      if (error.message.includes('Member not found')) {
        errorMessage = 'Member number not found or inactive';
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid member number. Please try again.';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email before logging in';
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    memberNumber,
    setMemberNumber,
    loading,
    handleLogin,
  };
};