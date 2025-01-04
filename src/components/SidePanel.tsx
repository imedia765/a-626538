import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Settings, Users, UserCheck } from "lucide-react";
import { UserRole } from "@/hooks/useRoleAccess";

interface SidePanelProps {
  onTabChange: (value: string) => void;
  userRole: UserRole;
}

const SidePanel = ({ onTabChange, userRole }: SidePanelProps) => {
  const getTabs = () => {
    const tabs = [
      {
        value: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        roles: ['member', 'collector', 'admin']
      },
      {
        value: 'users',
        label: 'Members',
        icon: Users,
        roles: ['collector', 'admin']
      },
      {
        value: 'collectors',
        label: 'Collectors',
        icon: UserCheck,
        roles: ['admin']
      },
      {
        value: 'settings',
        label: 'Settings',
        icon: Settings,
        roles: ['admin']
      }
    ];

    // Only show tabs that the user has access to based on their role
    return tabs.filter(tab => {
      if (!userRole) return false;
      return tab.roles.includes(userRole);
    });
  };

  return (
    <div className="h-screen fixed left-0 top-0 w-64 glass-card border-r border-white/10">
      <div className="p-6">
        <h2 className="text-xl font-medium mb-6">Navigation</h2>
        <Tabs 
          defaultValue="dashboard" 
          orientation="vertical" 
          className="w-full"
          onValueChange={onTabChange}
        >
          <TabsList className="flex flex-col h-auto bg-transparent text-white">
            {getTabs().map(({ value, label, icon: Icon }) => (
              <TabsTrigger 
                key={value}
                value={value} 
                className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
              >
                <Icon className="w-4 h-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SidePanel;