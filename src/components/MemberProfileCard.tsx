import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Member } from "@/types/member";

interface MemberProfileCardProps {
  memberProfile: Member | null;
}

const MemberProfileCard = ({ memberProfile }: MemberProfileCardProps) => {
  if (!memberProfile) {
    return (
      <Card className="bg-dashboard-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Profile Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dashboard-text">
            Your profile has not been set up yet. Please contact an administrator.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dashboard-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Member Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-white/10">
            <AvatarFallback className="bg-dashboard-accent1 text-lg">
              {memberProfile?.full_name?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-medium text-white">{memberProfile?.full_name}</h3>
            <div className="text-sm space-y-1">
              <p className="text-dashboard-text">Member #{memberProfile?.member_number}</p>
              <p className="text-dashboard-text">Email: {memberProfile?.email || 'Not provided'}</p>
              <p className="text-dashboard-text">Phone: {memberProfile?.phone || 'Not provided'}</p>
              <div className="mt-2">
                <p className="text-dashboard-muted mb-1">Address</p>
                <p className="text-dashboard-text">
                  {memberProfile?.address || 'No street address provided'}
                </p>
                <p className="text-dashboard-text">
                  {memberProfile?.town ? `${memberProfile.town}` : 'No town provided'}
                  {memberProfile?.postcode ? `, ${memberProfile.postcode}` : ''}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-dashboard-text">
                  Status: {' '}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    memberProfile?.status === 'active' 
                      ? 'bg-dashboard-accent3/20 text-dashboard-accent3' 
                      : 'bg-dashboard-muted/20 text-dashboard-muted'
                  }`}>
                    {memberProfile?.status || 'Pending'}
                  </span>
                </p>
                <p className="text-dashboard-text">
                  Membership Type: {memberProfile?.membership_type || 'Standard'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberProfileCard;