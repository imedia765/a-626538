import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Lock, Database } from "lucide-react";

interface DatabaseConfigProps {
  tables: any[];
  policies: any[];
}

const DatabaseConfig = ({ tables, policies }: DatabaseConfigProps) => {
  if (!tables?.length && !policies?.length) return null;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-dashboard-accent1 font-semibold mb-2 flex items-center gap-2">
          <Database className="w-4 h-4" />
          Database Tables
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table Name</TableHead>
              <TableHead>Columns</TableHead>
              <TableHead>Has RLS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map((table: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{table.name}</TableCell>
                <TableCell>{table.columns?.length || 0} columns</TableCell>
                <TableCell>
                  {table.rls_enabled ? (
                    <span className="text-green-500 flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Enabled
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Disabled
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-dashboard-accent1 font-semibold mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          RLS Policies
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table</TableHead>
              <TableHead>Policy Name</TableHead>
              <TableHead>Operation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{policy.table}</TableCell>
                <TableCell>{policy.name}</TableCell>
                <TableCell>{policy.command}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DatabaseConfig;