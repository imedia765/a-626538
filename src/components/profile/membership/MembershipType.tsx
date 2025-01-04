import RoleBadge from "../RoleBadge";
import { Shield } from "lucide-react";
import RoleSelector from "./RoleSelector";

interface MembershipTypeProps {
  membershipType: string | undefined;
  displayRole: string;
  isAdmin: boolean;
  authUserId: string | undefined;
}

const MembershipType = ({ membershipType, displayRole, isAdmin, authUserId }: MembershipTypeProps) => {
  return (
    <div className="text-dashboard-text flex items-center gap-2">
      <span className="text-dashboard-accent2">Type:</span>
      <span className="flex items-center gap-2">
        {membershipType || 'Standard'}
        {displayRole === 'admin' ? (
          <div className="ml-2">
            <RoleSelector authUserId={authUserId} />
          </div>
        ) : (
          <RoleBadge role={displayRole} />
        )}
      </span>
    </div>
  );
};

export default MembershipType;