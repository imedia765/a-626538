import { Member } from "@/types/member";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import StatusBadge from "./membership/StatusBadge";
import MembershipType from "./membership/MembershipType";

interface MembershipDetailsProps {
  memberProfile: Member;
  userRole: string | null;
}

const MembershipDetails = ({ memberProfile, userRole }: MembershipDetailsProps) => {
  // First check if user is a collector
  const { data: collectorStatus } = useQuery({
    queryKey: ['collectorStatus', memberProfile.id],
    queryFn: async () => {
      console.log('Checking collector status for member:', memberProfile.id);
      const { data, error } = await supabase
        .from('members_collectors')
        .select('name')
        .eq('id', memberProfile.collector_id)
        .maybeSingle();

      if (error) {
        console.error('Error checking collector status:', error);
        return null;
      }

      console.log('Collector status result:', data);
      return data ? 'collector' : null;
    },
    enabled: !!memberProfile.id
  });

  // Then check user_roles table, prioritizing admin role
  const { data: roleFromTable } = useQuery({
    queryKey: ['userRole', memberProfile.auth_user_id],
    queryFn: async () => {
      if (!memberProfile.auth_user_id) return null;
      
      console.log('Checking user_roles for:', memberProfile.auth_user_id);
      
      // First check for admin role
      const { data: adminRole, error: adminError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', memberProfile.auth_user_id)
        .eq('role', 'admin')
        .maybeSingle();

      if (adminError) {
        console.error('Error checking admin role:', adminError);
        return null;
      }

      if (adminRole) {
        console.log('User is an admin');
        return 'admin';
      }

      // If not admin, check for collector role
      const { data: collectorRole, error: collectorError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', memberProfile.auth_user_id)
        .eq('role', 'collector')
        .maybeSingle();

      if (collectorError) {
        console.error('Error checking collector role:', collectorError);
        return null;
      }

      if (collectorRole) {
        console.log('User is a collector');
        return 'collector';
      }

      // Finally check for member role
      const { data: memberRole, error: memberError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', memberProfile.auth_user_id)
        .eq('role', 'member')
        .maybeSingle();

      if (memberError) {
        console.error('Error checking member role:', memberError);
        return null;
      }

      if (memberRole) {
        console.log('User is a member');
        return 'member';
      }

      return null;
    },
    enabled: !!memberProfile.auth_user_id,
    retry: false
  });

  // Determine final role
  const displayRole = roleFromTable || collectorStatus || 'member';
  console.log('Final determined role:', displayRole);
  
  const isAdmin = displayRole === 'admin';

  return (
    <div className="space-y-2">
      <p className="text-dashboard-muted text-sm">Membership Details</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-dashboard-text flex items-center gap-2">
            Status:{' '}
            <StatusBadge status={memberProfile?.status} />
          </div>
          {isAdmin && (
            <span className="bg-dashboard-accent1/20 text-dashboard-accent1 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Admin
            </span>
          )}
        </div>
        <MembershipType 
          membershipType={memberProfile?.membership_type}
          displayRole={displayRole}
          isAdmin={isAdmin}
          authUserId={memberProfile.auth_user_id}
        />
      </div>
    </div>
  );
};

export default MembershipDetails;