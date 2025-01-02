import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Database } from '@/integrations/supabase/types';
import { User } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

type Member = Database['public']['Tables']['members']['Row'];

const CollectorMembers = ({ collectorName }: { collectorName: string }) => {
  const { data: members, isLoading } = useQuery({
    queryKey: ['collector_members', collectorName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('collector', collectorName)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Member[];
    },
  });

  if (isLoading) return <div>Loading members...</div>;
  if (!members?.length) return null;

  return (
    <ScrollArea className="h-[400px] w-full rounded-md">
      <div className="space-y-2 pr-4">
        {members.map((member) => (
          <div 
            key={member.id}
            className="flex items-center gap-3 p-3 bg-black/20 rounded-lg"
          >
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">{member.full_name}</p>
              <p className="text-xs text-gray-400">Member #{member.member_number}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CollectorMembers;