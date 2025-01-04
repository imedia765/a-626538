import MembershipInformation from "./MembershipInformation";
import CollectorResponsibilities from "./CollectorResponsibilities";

const CommitteeUpdate = () => {
  return (
    <div className="bg-dashboard-card rounded-lg shadow-lg p-8 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Committee Update</h2>
        <div className="flex items-center gap-4">
          <MembershipInformation />
          <CollectorResponsibilities />
        </div>
      </div>
      <div className="text-dashboard-text space-y-4">
        <p>The committee has been working hard to improve our services and make sure we're meeting the needs of our community.</p>
        <p>We've made some important updates to our policies and procedures, and we encourage all members to stay informed about these changes.</p>
        <p>If you have any questions or concerns, please don't hesitate to reach out to your collector or the committee directly.</p>
      </div>
    </div>
  );
};

export default CommitteeUpdate;