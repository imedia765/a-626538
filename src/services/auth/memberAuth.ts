import { supabase } from "@/integrations/supabase/client";

export const findMemberByNumber = async (memberNumber: string) => {
  console.log('Finding member with number:', memberNumber);
  
  // Normalize member number to uppercase and trim whitespace
  const formattedMemberNumber = memberNumber.trim().toUpperCase();
  
  try {
    // First try exact match
    const { data: member, error } = await supabase
      .from('members')
      .select('id, member_number, auth_user_id')
      .eq('member_number', formattedMemberNumber)
      .maybeSingle();

    console.log('Member search result:', { member, error });
    
    if (error) {
      console.error('Error finding member:', error);
      throw error;
    }

    if (!member) {
      // If no exact match, try case-insensitive search
      const { data: fuzzyMember, error: fuzzyError } = await supabase
        .from('members')
        .select('id, member_number, auth_user_id')
        .ilike('member_number', `%${formattedMemberNumber}%`)
        .maybeSingle();

      console.log('Fuzzy member search result:', { fuzzyMember, fuzzyError });

      if (fuzzyError) {
        console.error('Error in fuzzy search:', fuzzyError);
        throw fuzzyError;
      }

      if (!fuzzyMember) {
        throw new Error(`Member ${memberNumber} not found in our records. Please check your member number or contact support.`);
      }

      return fuzzyMember;
    }

    return member;
  } catch (error) {
    console.error('Error in findMemberByNumber:', error);
    throw error;
  }
};

export const loginOrSignupMember = async (memberNumber: string) => {
  const email = `${memberNumber.toLowerCase()}@temp.com`;
  const password = memberNumber;

  try {
    // Try to sign in first
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.log('Sign in failed, attempting signup:', signInError);
      
      if (signInError.message === 'Invalid login credentials') {
        // If sign in fails, try to sign up
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
        if (!signUpData.user) {
          console.error('Failed to create user account - no user returned');
          throw new Error('Failed to create user account');
        }

        return signUpData;
      }
      throw signInError;
    }

    return signInData;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
};