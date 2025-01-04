import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import SidePanel from '@/components/SidePanel';
import DashboardView from '@/components/DashboardView';
import MembersList from '@/components/MembersList';
import CollectorsList from '@/components/CollectorsList';
import MemberAnalyzer from '@/components/settings/MemberAnalyzer';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { userRole, roleLoading } = useRoleAccess();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const renderContent = () => {
    if (roleLoading) {
      return <div>Loading...</div>;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onLogout={handleLogout} />;
      case 'users':
        return <MembersList searchTerm={searchTerm} userRole={userRole} />;
      case 'collectors':
        return <CollectorsList />;
      case 'settings':
        return <MemberAnalyzer />;
      default:
        return <DashboardView onLogout={handleLogout} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dashboard-background text-dashboard-text">
      <SidePanel onTabChange={setActiveTab} userRole={userRole} />
      <main className="flex-1 ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;