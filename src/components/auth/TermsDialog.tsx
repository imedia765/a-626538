import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsDialog = ({ open, onOpenChange }: TermsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>PWA Collector Member Responsibilities</DialogTitle>
          <DialogDescription>V1 April 2024</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>
            A Collector member is a senior member of the PWA who is responsible for a specific number of paying
            members who are part of the death committee.
          </p>
          <p className="font-semibold">The Collector will be responsible for the following:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Act as the representative of the death committee for each member on their list.</li>
            <li>Act as first point of contact for any enquiries from members or prospective members.</li>
            <li>Register new members with the death committee.</li>
            <li>Communicate announcements from death committee to members.</li>
            <li>Collect member's fees whenever a collection is due.</li>
            <li>Keep a record of all members' payments made in to PWA bank account, including date paid, reference
                used and bank account name. When consolidating collection with treasurer share record/evidence of
                online payments if requested.</li>
            <li>Act as conduit between the members and death committee Senior Leadership Team (SLT) for any day-to-day issues.</li>
            <li>Attending Collectors meetings with other members.</li>
            <li>Provide guidance to new members and prospective members seeking membership with the PWA.</li>
            <li>Feedback any issues or concerns to the PWA SLT.</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;