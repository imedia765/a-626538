import { formatDistanceToNow } from 'date-fns';
import { Member } from "@/types/member";
import { CreditCard, Calendar, Receipt } from "lucide-react";

interface FinancialDetailsProps {
  memberProfile: Member;
}

const FinancialDetails = ({ memberProfile }: FinancialDetailsProps) => {
  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'Not recorded';
    return `£${amount.toFixed(2)}`;
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'No payment date recorded';
    try {
      return `${formatDistanceToNow(new Date(date))} ago`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-dashboard-muted text-sm">Financial Information</p>
      <div className="space-y-2 bg-white/5 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-dashboard-accent2" />
          <span className="text-dashboard-accent2">Amount:</span>
          <span className="text-dashboard-text">
            {formatCurrency(memberProfile?.payment_amount || null)}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-dashboard-accent2" />
          <span className="text-dashboard-accent2">Type:</span>
          <span className="text-dashboard-text">
            {memberProfile?.payment_type || 'Not specified'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-dashboard-accent2" />
          <span className="text-dashboard-accent2">Last Payment:</span>
          <span className="text-dashboard-text">
            {formatDate(memberProfile?.payment_date || null)}
          </span>
        </div>

        {memberProfile?.payment_notes && (
          <div className="mt-2 pt-2 border-t border-white/10">
            <p className="text-dashboard-muted text-sm">Notes:</p>
            <p className="text-dashboard-text text-sm">{memberProfile.payment_notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialDetails;