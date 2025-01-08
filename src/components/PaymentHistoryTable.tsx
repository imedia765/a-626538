import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
}

const PaymentHistoryTable = () => {
  const { toast } = useToast();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payment-history'],
    queryFn: async () => {
      console.log('Starting payment history fetch...');
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Failed to get session');
      }
      
      if (!session?.user) {
        console.error('No user session found');
        throw new Error('No user logged in');
      }
      
      console.log('Session found for user:', session.user.id);

      // Get user metadata
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User fetch error:', userError);
        throw new Error('Failed to get user data');
      }

      const memberNumber = user?.user_metadata?.member_number;
      console.log('Member number from metadata:', memberNumber);
      
      if (!memberNumber) {
        console.error('No member number found in user metadata');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Member number not found in user profile",
        });
        throw new Error('Member number not found');
      }

      // Fetch payment requests
      const { data, error: paymentsError } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('member_number', memberNumber)
        .order('created_at', { ascending: false });

      if (paymentsError) {
        console.error('Error fetching payment requests:', paymentsError);
        throw paymentsError;
      }

      console.log('Fetched payment requests:', data);

      if (!data || data.length === 0) {
        console.log('No payment records found for member:', memberNumber);
      }

      // Transform the data
      return data.map(payment => ({
        id: payment.id,
        date: payment.created_at,
        type: payment.payment_type,
        amount: payment.amount,
        status: payment.status
      }));
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-4">
        <h3 className="text-xl font-semibold mb-4 text-white">Payment History</h3>
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading payment history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4">
        <h3 className="text-xl font-semibold mb-4 text-white">Payment History</h3>
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span>Error loading payment history: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="glass-card p-4">
        <h3 className="text-xl font-semibold mb-4 text-white">Payment History</h3>
        <div className="flex items-center gap-2 text-white">
          <AlertCircle className="h-4 w-4" />
          <span>No payment history found. Please check if you have any pending payments or contact your collector for assistance.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4">
      <h3 className="text-xl font-semibold mb-4 text-white">Payment History</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{format(new Date(payment.date), 'PPP')}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell className="text-dashboard-accent3">
                  <span className="text-dashboard-accent3">£</span>{payment.amount}
                </TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;