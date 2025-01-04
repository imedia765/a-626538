import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface MemberDetailsProps {
  memberDetails: any;
}

const MemberDetails = ({ memberDetails }: MemberDetailsProps) => {
  if (!memberDetails) return null;

  return (
    <div className="p-4">
      <h3 className="text-dashboard-accent1 font-semibold mb-2">Member Information</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Full Name</TableCell>
            <TableCell>{memberDetails.full_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Member Number</TableCell>
            <TableCell>{memberDetails.member_number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Email</TableCell>
            <TableCell>{memberDetails.email || 'Not provided'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Phone</TableCell>
            <TableCell>{memberDetails.phone || 'Not provided'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell>{memberDetails.status || 'Not set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Membership Type</TableCell>
            <TableCell>{memberDetails.membership_type || 'Not set'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberDetails;