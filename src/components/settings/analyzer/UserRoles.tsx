import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserRolesProps {
  roles: any[];
}

const UserRoles = ({ roles }: UserRolesProps) => {
  if (!roles?.length) return null;

  return (
    <div className="p-4">
      <h3 className="text-dashboard-accent1 font-semibold mb-2">User Roles</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Assigned Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{role.role}</TableCell>
              <TableCell>{new Date(role.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRoles;