import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MemberProfileCard from './MemberProfileCard';
import { Button } from "@/components/ui/button";

interface DashboardViewProps {
  onLogout: () => void;
}

const DashboardView = ({ onLogout }: DashboardViewProps) => {
  const { toast } = useToast();

  const { data: memberProfile, isError } = useQuery({
    queryKey: ['memberProfile'],
    queryFn: async () => {
      console.log('Fetching member profile...');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .maybeSingle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching member profile",
          description: error.message
        });
        throw error;
      }
      
      return data;
    },
  });

  return (
    <>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium mb-2 text-white">Dashboard</h1>
          <p className="text-dashboard-text">Welcome back!</p>
        </div>
        <Button 
          onClick={onLogout} 
          variant="outline" 
          className="border-white/10 hover:bg-white/5 text-dashboard-text"
        >
          Logout
        </Button>
      </header>
      
      <div className="grid gap-6">
        <MemberProfileCard memberProfile={memberProfile} />
      </div>
    </>
  );
};

export default DashboardView;