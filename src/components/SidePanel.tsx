import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Settings, Users, UserCheck } from "lucide-react";

interface SidePanelProps {
  onTabChange: (value: string) => void;
}

const SidePanel = ({ onTabChange }: SidePanelProps) => {
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
            <TabsTrigger 
              value="dashboard" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="collectors" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <UserCheck className="w-4 h-4" />
              Collectors
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SidePanel;