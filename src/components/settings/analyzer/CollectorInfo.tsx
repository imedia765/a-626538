import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface CollectorInfoProps {
  collectorStatus: any;
}

const CollectorInfo = ({ collectorStatus }: CollectorInfoProps) => {
  if (!collectorStatus) return null;

  return (
    <div className="p-4">
      <h3 className="text-dashboard-accent1 font-semibold mb-2">Collector Information</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Collector Name</TableCell>
            <TableCell>{collectorStatus.name || 'Not set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Collector Number</TableCell>
            <TableCell>{collectorStatus.number || 'Not set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell>{collectorStatus.active ? 'Active' : 'Inactive'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectorInfo;