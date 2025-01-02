import { Users } from 'lucide-react';

interface TotalCountItem {
  count: number;
  label: string;
  icon?: React.ReactNode;
}

interface TotalCountProps {
  items?: TotalCountItem[];
  // Support for legacy props
  count?: number;
  label?: string;
  icon?: React.ReactNode;
}

const TotalCount = ({ items, count, label, icon }: TotalCountProps) => {
  // If legacy props are provided, convert them to items format
  const displayItems = items || (count !== undefined ? [{ count, label: label || '', icon }] : []);

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center gap-8">
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.icon}
            <div>
              <p className="text-sm text-dashboard-muted">{item.label}</p>
              <p className="text-2xl font-semibold">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCount;