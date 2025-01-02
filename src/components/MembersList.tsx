import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Database } from '@/integrations/supabase/types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Member = Database['public']['Tables']['members']['Row'];

const MembersList = ({ searchTerm }: { searchTerm: string }) => {
  const { data: members, isLoading, error } = useQuery({
    queryKey: ['members', searchTerm],
    queryFn: async () => {
      console.log('Fetching members...');
      let query = supabase
        .from('members')
        .select('*');
      
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,member_number.ilike.%${searchTerm}%,collector.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching members:', error);
        throw error;
      }
      
      return data as Member[];
    },
  });

  if (isLoading) return <div className="text-center py-4">Loading members...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading members: {error.message}</div>;
  if (!members?.length) return <div className="text-center py-4">No members found</div>;

  return (
    <ScrollArea className="h-[600px] w-full rounded-md">
      <div className="space-y-4">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="bg-dashboard-card p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-dashboard-accent1 text-lg">
                  {member.full_name?.charAt(0) || 'M'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-1">{member.full_name}</h3>
                    <p className="text-dashboard-text">Member #{member.member_number}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    member.status === 'active' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {member.status || 'Pending'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-dashboard-muted mb-1">Contact Information</p>
                    <p className="text-dashboard-text">{member.email || 'No email provided'}</p>
                    <p className="text-dashboard-text">{member.phone || 'No phone provided'}</p>
                  </div>
                  <div>
                    <p className="text-dashboard-muted mb-1">Address</p>
                    <p className="text-dashboard-text">
                      {member.address || 'No address provided'}
                      {member.town && `, ${member.town}`}
                      {member.postcode && ` ${member.postcode}`}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-dashboard-muted mb-1">Membership Type</p>
                      <p className="text-dashboard-text">{member.membership_type || 'Standard'}</p>
                    </div>
                    <div>
                      <p className="text-dashboard-muted mb-1">Collector</p>
                      <p className="text-dashboard-text">{member.collector || 'Not assigned'}</p>
                    </div>
                    <div>
                      <p className="text-dashboard-muted mb-1">Registration Status</p>
                      <p className="text-dashboard-text">{member.registration_status || 'Pending'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MembersList;