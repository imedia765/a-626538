import { formatDistanceToNow } from 'date-fns';
import { Member } from "@/types/member";
import { CreditCard, Calendar, Receipt, AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 28;
  };

  return (
    <div className="space-y-4">
      <p className="text-dashboard-muted text-sm">Financial Information</p>
      
      {/* Regular Payment Information */}
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
      </div>

      {/* Yearly Payment Information */}
      <div className="space-y-2 bg-white/5 p-3 rounded-lg">
        <h4 className="font-medium text-dashboard-accent2 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Yearly Payment
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-dashboard-muted">Amount:</span>
            <span className="text-dashboard-text">
              {formatCurrency(memberProfile?.yearly_payment_amount || null)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-dashboard-muted">Due Date:</span>
            <span className="text-dashboard-text">
              {memberProfile?.yearly_payment_due_date || 'January 28th, 2025'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-dashboard-muted">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              memberProfile?.yearly_payment_status === 'paid'
                ? 'bg-dashboard-accent3/20 text-dashboard-accent3'
                : isOverdue(memberProfile?.yearly_payment_due_date || null)
                  ? 'bg-red-500/20 text-red-500'
                  : 'bg-yellow-500/20 text-yellow-500'
            }`}>
              {memberProfile?.yearly_payment_status || 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Collection Information - Only show if there's an active collection */}
      {memberProfile?.emergency_collection_amount && (
        <div className="space-y-2">
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Emergency Collection Required
            </AlertDescription>
          </Alert>
          
          <div className="bg-white/5 p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Amount Due:</span>
              <span className="text-dashboard-text">
                {formatCurrency(memberProfile?.emergency_collection_amount)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Due Date:</span>
              <span className="text-dashboard-text">
                {memberProfile?.emergency_collection_due_date || 'Not set'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                memberProfile?.emergency_collection_status === 'paid'
                  ? 'bg-dashboard-accent3/20 text-dashboard-accent3'
                  : isOverdue(memberProfile?.emergency_collection_due_date || null)
                    ? 'bg-red-500/20 text-red-500'
                    : 'bg-yellow-500/20 text-yellow-500'
              }`}>
                {memberProfile?.emergency_collection_status || 'Pending'}
              </span>
            </div>
          </div>
        </div>
      )}

      {memberProfile?.payment_notes && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <p className="text-dashboard-muted text-sm">Notes:</p>
          <p className="text-dashboard-text text-sm">{memberProfile.payment_notes}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialDetails;