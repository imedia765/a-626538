import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collector {
  id: string;
  name: string | null;
  prefix: string | null;
  number: string | null;
  email: string | null;
  phone: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  member_number: string | null;
  memberCount?: number;
}

const CollectorsList = () => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const { data: collectors, isLoading } = useQuery({
    queryKey: ['collectors'],
    queryFn: async () => {
      console.log('Fetching collectors...');
      
      // First get all collectors
      const { data: collectorsData, error: collectorsError } = await supabase
        .from('members_collectors')
        .select(`
          id,
          name,
          prefix,
          number,
          email,
          phone,
          active,
          created_at,
          updated_at,
          member_number
        `)
        .order('number', { ascending: true });
      
      if (collectorsError) {
        console.error('Error fetching collectors:', collectorsError);
        setError(collectorsError.message);
        return [];
      }

      // Then enhance with member counts
      return await Promise.all(collectorsData.map(async (collector) => {
        const { count, error: countError } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true })
          .eq('collector', collector.name);
        
        if (countError) {
          console.error('Error fetching member count:', countError);
          toast({
            title: "Error",
            description: "Failed to fetch member count",
            variant: "destructive",
          });
        }
        
        return {
          ...collector,
          memberCount: count || 0,
          memberNumber: collector.member_number
        };
      }) || []);
    }
  });

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading collectors: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {collectors?.map((collector) => (
        <Card key={collector.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-dashboard-text">
                {collector.name}
              </h3>
              <p className="text-sm text-dashboard-muted">
                Member Number: {collector.memberNumber || 'Not assigned'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-dashboard-accent2/20 text-dashboard-accent2 border-0">
                  <UserCheck className="w-3 h-3 mr-1" />
                  {collector.memberCount} Members
                </Badge>
                {collector.active ? (
                  <Badge variant="outline" className="bg-dashboard-accent3/20 text-dashboard-accent3 border-0">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-dashboard-muted/20 text-dashboard-muted border-0">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
            <Users className="w-8 h-8 text-dashboard-muted" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CollectorsList;