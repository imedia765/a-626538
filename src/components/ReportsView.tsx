import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Database } from "@/integrations/supabase/types";

type TableInfo = {
  name: string;
  columns: { name: string; type: string }[];
  rls_enabled: boolean;
};

// Define valid table names from the Database type
type ValidTableNames = keyof Database['public']['Tables'];

const ReportsView = () => {
  const { toast } = useToast();
  const [selectedTable, setSelectedTable] = useState<ValidTableNames | null>(null);
  
  // Query to get table information
  const { data: tables, isLoading: loadingTables } = useQuery({
    queryKey: ['table-info'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_tables_info');
      if (error) throw error;
      return data as TableInfo[];
    },
  });

  // Query to get table data
  const { data: tableData, isLoading: loadingData } = useQuery({
    queryKey: ['table-data', selectedTable],
    enabled: !!selectedTable,
    queryFn: async () => {
      if (!selectedTable) return null;
      const { data, error } = await supabase
        .from(selectedTable)
        .select('*')
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  const downloadCsv = async () => {
    if (!selectedTable || !tableData) return;

    try {
      // Create CSV content
      const headers = Object.keys(tableData[0] || {}).join(',');
      const rows = tableData.map(row => 
        Object.values(row).map(value => 
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        ).join(',')
      );
      const csv = [headers, ...rows].join('\n');

      // Create and trigger download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTable}-report.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Downloaded",
        description: `${selectedTable} report has been downloaded as CSV`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTableSelect = (tableName: string) => {
    // Type assertion here is safe because we know the table names come from the database
    setSelectedTable(tableName as ValidTableNames);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2 text-white">Database Reports</h1>
        <p className="text-dashboard-text">Generate and download database table reports</p>
      </header>

      <div className="grid gap-6">
        <Card className="bg-dashboard-card border-dashboard-accent1/20 p-6">
          <h2 className="text-xl font-medium text-white mb-4">Available Tables</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {loadingTables ? (
              <div className="col-span-full flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-dashboard-accent1" />
              </div>
            ) : (
              tables?.map(table => (
                <Button
                  key={table.name}
                  variant={selectedTable === table.name ? "default" : "outline"}
                  onClick={() => handleTableSelect(table.name)}
                  className="w-full"
                >
                  {table.name}
                </Button>
              ))
            )}
          </div>
        </Card>

        {selectedTable && (
          <Card className="bg-dashboard-card border-dashboard-accent1/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-white">
                {selectedTable} Data
              </h2>
              <Button
                onClick={downloadCsv}
                disabled={!tableData?.length}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download CSV
              </Button>
            </div>

            <div className="rounded-md border border-white/10">
              {loadingData ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-dashboard-accent1" />
                </div>
              ) : tableData?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      {Object.keys(tableData[0]).map(header => (
                        <TableHead key={header} className="text-dashboard-text">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, i) => (
                      <TableRow 
                        key={i}
                        className="border-white/10 hover:bg-white/5"
                      >
                        {Object.values(row).map((value, j) => (
                          <TableCell key={j} className="text-dashboard-text">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-dashboard-text">
                  No data available
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportsView;