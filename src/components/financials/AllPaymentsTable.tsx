import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface AllPaymentsTableProps {
  showHistory?: boolean;
}

const AllPaymentsTable = ({ showHistory = false }: AllPaymentsTableProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = React.useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(10);

  const { data: paymentsData, isLoading } = useQuery({
    queryKey: ['payment-requests', page, itemsPerPage],
    queryFn: async () => {
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      // Get paginated payment data
      const { data, error, count } = await supabase
        .from('payment_requests')
        .select(`
          *,
          members!payment_requests_member_id_fkey(full_name),
          collectors:members_collectors(name)
        `, { count: 'exact', head: false })
        .order('created_at', { ascending: false })
        .range(from, to)
        .limit(null);

      if (error) throw error;

      // Get total member count
      const { count: totalMembers } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });

      // Calculate totals based on actual member count
      const yearlyFee = 40;
      const totalExpected = (totalMembers || 0) * yearlyFee;
      const totalCollected = (data || [])
        .filter(p => p.status === 'approved')
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      const remainingToCollect = totalExpected - totalCollected;

      return {
        data,
        count,
        totals: {
          totalExpected,
          totalCollected,
          remainingToCollect
        }
      };
    },
  });

  const totalPages = Math.ceil((paymentsData?.count || 0) / itemsPerPage);
  const payments = paymentsData?.data || [];

  const handleApproval = async (paymentId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('payment_requests')
        .update({
          status: approved ? 'approved' : 'rejected',
          approved_at: approved ? new Date().toISOString() : null,
          approved_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', paymentId);

      if (error) throw error;

      toast({
        title: approved ? "Payment Approved" : "Payment Rejected",
        description: "The payment request has been processed successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ['payment-requests'] });
      queryClient.invalidateQueries({ queryKey: ['payment-statistics'] });
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process the payment request.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Card className="bg-dashboard-card border-dashboard-accent1/20 rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-medium text-white mb-4">Payment History & Approvals</h2>
        <div className="rounded-md border border-white/10">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-dashboard-text">Date</TableHead>
                <TableHead className="text-dashboard-text">Member</TableHead>
                <TableHead className="text-dashboard-text">Collector</TableHead>
                <TableHead className="text-dashboard-text">Type</TableHead>
                <TableHead className="text-dashboard-text">Amount</TableHead>
                <TableHead className="text-dashboard-text">Status</TableHead>
                <TableHead className="text-dashboard-text">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.map((payment) => (
                <TableRow 
                  key={payment.id}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="text-dashboard-text">
                    {format(new Date(payment.created_at), 'PPP')}
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    {payment.members?.full_name}
                  </TableCell>
                  <TableCell className="text-dashboard-accent1">
                    {payment.collectors?.name}
                  </TableCell>
                  <TableCell className="capitalize text-dashboard-text">
                    {payment.payment_type}
                  </TableCell>
                  <TableCell className="text-dashboard-accent3">
                    £{payment.amount}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${payment.status === 'approved' ? 'bg-dashboard-accent3/20 text-dashboard-accent3' : 
                        payment.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 
                        'bg-dashboard-warning/20 text-dashboard-warning'}`}>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {payment.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-dashboard-accent3 hover:text-dashboard-accent3 hover:bg-dashboard-accent3/20"
                          onClick={() => handleApproval(payment.id, true)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-400 hover:bg-red-500/20"
                          onClick={() => handleApproval(payment.id, false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default AllPaymentsTable;