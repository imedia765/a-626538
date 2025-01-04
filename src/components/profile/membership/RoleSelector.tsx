import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type AppRole = 'admin' | 'collector' | 'member';

interface RoleSelectorProps {
  authUserId: string | undefined;
}

const RoleSelector = ({ authUserId }: RoleSelectorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRoleChange = async (newRole: AppRole) => {
    if (!authUserId) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      return;
    }

    try {
      // First, delete existing role
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', authUserId);

      if (deleteError) throw deleteError;

      // Then insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authUserId,
          role: newRole
        });

      if (insertError) throw insertError;

      // Invalidate all relevant queries
      await queryClient.invalidateQueries({ queryKey: ['userRole'] });
      await queryClient.invalidateQueries({ queryKey: ['collectorStatus'] });

      toast({
        title: "Success",
        description: `Role updated to ${newRole}`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      });
    }
  };

  return (
    <Select onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[140px] h-8 bg-dashboard-accent1/10 border-dashboard-accent1/20">
        <SelectValue placeholder="Change Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Admin
          </div>
        </SelectItem>
        <SelectItem value="collector">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Collector
          </div>
        </SelectItem>
        <SelectItem value="member">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Member
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;