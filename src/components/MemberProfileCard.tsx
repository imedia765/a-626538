import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Member } from "@/types/member";

interface MemberProfileCardProps {
  memberProfile: Member | null;
}

const MemberProfileCard = ({ memberProfile }: MemberProfileCardProps) => {
  if (!memberProfile) {
    return (
      <Card className="bg-dashboard-card border-white/10 shadow-lg">
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
    <Card className="bg-dashboard-card border-white/10 shadow-lg hover:border-dashboard-accent1/50 transition-all duration-300">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="text-dashboard-accent1">Member Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-24 w-24 border-2 border-dashboard-accent1/20">
              <AvatarFallback className="bg-dashboard-accent1/20 text-2xl text-dashboard-accent1">
                {memberProfile?.full_name?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-1">{memberProfile?.full_name}</h3>
              <p className="text-dashboard-text text-sm">Member #{memberProfile?.member_number}</p>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-dashboard-muted text-sm">Contact Information</p>
                  <div className="space-y-1">
                    <p className="text-dashboard-text">
                      <span className="text-dashboard-accent2">Email:</span> {memberProfile?.email || 'Not provided'}
                    </p>
                    <p className="text-dashboard-text">
                      <span className="text-dashboard-accent2">Phone:</span> {memberProfile?.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-dashboard-muted text-sm">Address Details</p>
                  <div className="space-y-1 bg-white/5 p-3 rounded-lg">
                    <p className="text-dashboard-text">
                      {memberProfile?.address || 'No street address provided'}
                    </p>
                    <p className="text-dashboard-text">
                      {memberProfile?.town ? `${memberProfile.town}` : 'No town provided'}
                      {memberProfile?.postcode ? `, ${memberProfile.postcode}` : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-dashboard-muted text-sm">Membership Details</p>
                  <div className="space-y-2">
                    <p className="text-dashboard-text flex items-center gap-2">
                      Status:{' '}
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        memberProfile?.status === 'active' 
                          ? 'bg-dashboard-accent3/20 text-dashboard-accent3' 
                          : 'bg-dashboard-muted/20 text-dashboard-muted'
                      }`}>
                        {memberProfile?.status || 'Pending'}
                      </span>
                    </p>
                    <p className="text-dashboard-text">
                      <span className="text-dashboard-accent2">Type:</span>{' '}
                      {memberProfile?.membership_type || 'Standard'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberProfileCard;