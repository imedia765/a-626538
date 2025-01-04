import { CheckCircle2 } from "lucide-react";

interface StatusBadgeProps {
  status: string | undefined;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
      status === 'active' 
        ? 'bg-dashboard-accent3/20 text-dashboard-accent3' 
        : 'bg-dashboard-muted/20 text-dashboard-muted'
    }`}>
      {status || 'Pending'}
      {status === 'active' && (
        <CheckCircle2 className="w-4 h-4 ml-1 text-dashboard-accent3" />
      )}
    </span>
  );
};

export default StatusBadge;