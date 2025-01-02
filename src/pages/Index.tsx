import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import DashboardView from '@/components/DashboardView';
import MembersList from '@/components/MembersList';
import SidePanel from '@/components/SidePanel';
import TotalCount from '@/components/TotalCount';
import MemberSearch from '@/components/MemberSearch';
import { Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const { data: membersData } = useQuery({
    queryKey: ['members_count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });
      
      return { totalCount: count || 0 };
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onLogout={handleLogout} />;
      case 'users':
        return (
          <>
            <header className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-medium mb-2 text-white">Members</h1>
                <p className="text-dashboard-muted">View and manage member information</p>
              </div>
            </header>
            <TotalCount 
              items={[{
                count: membersData?.totalCount || 0,
                label: "Total Members",
                icon: <Users className="w-6 h-6 text-dashboard-accent1" />
              }]}
            />
            <MemberSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <MembersList searchTerm={searchTerm} />
          </>
        );
      case 'settings':
        return (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-medium mb-2 text-white">Settings</h1>
              <p className="text-dashboard-muted">Configure your application settings</p>
            </header>
            <div className="bg-dashboard-card p-6 rounded-lg border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Dark Mode</p>
                    <p className="text-sm text-dashboard-muted">Toggle dark mode</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-dark">
      <SidePanel onTabChange={setActiveTab} />
      <div className="pl-64">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;