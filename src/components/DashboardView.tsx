import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MemberProfileCard from './MemberProfileCard';
import { Button } from "@/components/ui/button";

interface DashboardViewProps {
  onLogout: () => void;
}

const DashboardView = ({ onLogout }: DashboardViewProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await queryClient.invalidateQueries();
      await supabase.auth.signOut();
      onLogout();
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const { data: memberProfile, isError, error, isLoading } = useQuery({
    queryKey: ['memberProfile'],
    queryFn: async () => {
      try {
        console.log('Starting member profile fetch...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.error('No active session found');
          throw new Error('No active session');
        }

        console.log('Session found:', {
          userId: session.user.id,
          metadata: session.user.user_metadata
        });

        // First get the member number from the user metadata
        const memberNumber = session.user.user_metadata?.member_number;
        console.log('Member number from metadata:', memberNumber);
        
        if (!memberNumber) {
          console.error('No member number in metadata');
          throw new Error('Member number not found');
        }

        // Query the members table
        console.log('Querying members table with:', {
          memberNumber: memberNumber,
          userId: session.user.id
        });
        
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .or(`member_number.eq.${memberNumber},auth_user_id.eq.${session.user.id}`)
          .maybeSingle();

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        console.log('Query result:', data);

        if (!data) {
          console.error('No member found with number:', memberNumber);
          throw new Error('Member not found');
        }
        
        return data;
      } catch (error) {
        console.error('Error in member profile query:', error);
        throw error;
      }
    },
    retry: 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('Error in member profile query:', error);
    if (error instanceof Error && error.message === 'No active session') {
      toast({
        title: "Session Expired",
        description: "Please log in again",
        variant: "destructive",
      });
      onLogout();
      return null;
    }
    
    return (
      <div className="text-red-500">
        Error loading profile. Please try refreshing the page.
      </div>
    );
  }

  return (
    <>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium mb-2 text-white">Dashboard</h1>
          <p className="text-dashboard-text">Welcome back!</p>
        </div>
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          className="border-white/10 hover:bg-white/5 text-dashboard-text"
        >
          Logout
        </Button>
      </header>
      
      <div className="grid gap-6">
        {memberProfile && <MemberProfileCard memberProfile={memberProfile} />}
      </div>
    </>
  );
};

export default DashboardView;