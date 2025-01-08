import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import TotalCount from "@/components/TotalCount";
import { Users, Wallet, Receipt, PoundSterling, Clock, CheckCircle2 } from "lucide-react";

const PaymentStatistics = () => {
  const { data: stats } = useQuery({
    queryKey: ['payment-statistics'],
    queryFn: async () => {
      const { data: members, error } = await supabase
        .from('members')
        .select('yearly_payment_status, emergency_collection_status, emergency_collection_amount, yearly_payment_amount');

      if (error) throw error;

      const totalMembers = members?.length || 0;
      const yearlyPaid = members?.filter(m => m.yearly_payment_status === 'completed').length || 0;
      const yearlyUnpaid = totalMembers - yearlyPaid;
      const emergencyPaid = members?.filter(m => m.emergency_collection_status === 'completed').length || 0;
      const emergencyUnpaid = totalMembers - emergencyPaid;
      
      const totalYearlyAmount = totalMembers * 40; // £40 per member
      const collectedYearlyAmount = yearlyPaid * 40;
      const remainingYearlyAmount = yearlyUnpaid * 40;
      
      const totalEmergencyAmount = members?.reduce((sum, m) => sum + (m.emergency_collection_amount || 0), 0) || 0;
      const collectedEmergencyAmount = members
        ?.filter(m => m.emergency_collection_status === 'completed')
        .reduce((sum, m) => sum + (m.emergency_collection_amount || 0), 0) || 0;
      const remainingEmergencyAmount = totalEmergencyAmount - collectedEmergencyAmount;

      return {
        yearlyStats: {
          totalAmount: totalYearlyAmount,
          collectedAmount: collectedYearlyAmount,
          remainingAmount: remainingYearlyAmount,
          paidMembers: yearlyPaid,
          unpaidMembers: yearlyUnpaid
        },
        emergencyStats: {
          totalAmount: totalEmergencyAmount,
          collectedAmount: collectedEmergencyAmount,
          remainingAmount: remainingEmergencyAmount,
          paidMembers: emergencyPaid,
          unpaidMembers: emergencyUnpaid
        }
      };
    }
  });

  if (!stats) return null;

  return (
    <Card className="bg-dashboard-card p-6 mt-8 border border-white/10">
      <h3 className="text-xl font-medium text-white mb-6">Collection Statistics</h3>
      
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <TotalCount 
            items={[{
              count: `£${stats.yearlyStats.collectedAmount.toLocaleString()}`,
              label: "Yearly Collections Received",
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            }]}
          />
          <TotalCount 
            items={[{
              count: `£${stats.yearlyStats.remainingAmount.toLocaleString()}`,
              label: "Yearly Collections Pending",
              icon: <Clock className="w-5 h-5 text-amber-400" />
            }]}
          />
          <TotalCount 
            items={[{
              count: stats.yearlyStats.paidMembers,
              label: `Members Paid (${((stats.yearlyStats.paidMembers / (stats.yearlyStats.paidMembers + stats.yearlyStats.unpaidMembers)) * 100).toFixed(1)}%)`,
              icon: <Users className="w-5 h-5 text-indigo-400" />
            }]}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TotalCount 
            items={[{
              count: `£${stats.emergencyStats.collectedAmount.toLocaleString()}`,
              label: "Emergency Collections Received",
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            }]}
          />
          <TotalCount 
            items={[{
              count: `£${stats.emergencyStats.remainingAmount.toLocaleString()}`,
              label: "Emergency Collections Pending",
              icon: <Clock className="w-5 h-5 text-amber-400" />
            }]}
          />
          <TotalCount 
            items={[{
              count: stats.emergencyStats.paidMembers,
              label: `Members Paid (${((stats.emergencyStats.paidMembers / (stats.emergencyStats.paidMembers + stats.emergencyStats.unpaidMembers)) * 100).toFixed(1)}%)`,
              icon: <Users className="w-5 h-5 text-indigo-400" />
            }]}
          />
        </div>
      </div>
    </Card>
  );
};

export default PaymentStatistics;