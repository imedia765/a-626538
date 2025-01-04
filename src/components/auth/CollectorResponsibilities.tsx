import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList } from "lucide-react";

const CollectorResponsibilities = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-dashboard-accent1 hover:text-dashboard-accent2 transition-colors inline-flex items-center gap-2">
        <ClipboardList className="w-4 h-4" />
        <span>View Collector Responsibilities</span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-[#F1F0FB]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-[#221F26]">PWA Collector Member Responsibilities - V1 April 2024</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <p className="text-lg text-[#403E43]">A Collector member is a senior member of the PWA who is responsible for a specific number of paying members who are part of the death committee.</p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-[#221F26] text-lg">The Collector will be responsible for the following:</h3>
              <ol className="list-decimal list-inside space-y-3 pl-4 text-[#333333]">
                <li>Act as the representative of the death committee for each member on their list.</li>
                <li>Act as first point of contact for any enquiries from members or prospective members.</li>
                <li>Register new members with the death committee.</li>
                <li>Communicate announcements from death committee to members.</li>
                <li>Collect member's fees whenever a collection is due.</li>
                <li>Keep a record of all members' payments made in to PWA bank account, including date paid, reference used and bank account name. When consolidating collection with treasurer share record/evidence of online payments if requested.</li>
                <li>Act as conduit between the members and death committee Senior Leadership Team (SLT) for any day-to-day issues.</li>
                <li>Attending Collectors meetings with other members.</li>
                <li>Provide guidance to new members and prospective members seeking membership with the PWA.</li>
                <li>Feedback any issues or concerns to the PWA SLT.</li>
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CollectorResponsibilities;