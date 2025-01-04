import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/types/member";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileAvatar from "./profile/ProfileAvatar";
import ContactInfo from "./profile/ContactInfo";
import AddressDetails from "./profile/AddressDetails";
import MembershipDetails from "./profile/MembershipDetails";
import FinancialDetails from "./profile/membership/FinancialDetails";
import { useRoleAccess } from "@/hooks/useRoleAccess";

interface MemberProfileCardProps {
  memberProfile: Member | null;
}

const MemberProfileCard = ({ memberProfile }: MemberProfileCardProps) => {
  const { userRole } = useRoleAccess();

  if (!memberProfile) {
    return (
      <Card className="bg-dashboard-card border-white/10 shadow-lg">
        <ProfileHeader />
        <CardContent>
          <p className="text-dashboard-text">
            Your profile has not been set up yet. Please contact an administrator.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dashboard-card border-white/10 shadow-lg hover:border-dashboard-accent1/50 transition-all duration-300">
      <ProfileHeader />
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <ProfileAvatar memberProfile={memberProfile} />
          
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ContactInfo memberProfile={memberProfile} />
                <AddressDetails memberProfile={memberProfile} />
              </div>

              <div className="space-y-4">
                <MembershipDetails 
                  memberProfile={memberProfile}
                  userRole={userRole}
                />
                <FinancialDetails memberProfile={memberProfile} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberProfileCard;