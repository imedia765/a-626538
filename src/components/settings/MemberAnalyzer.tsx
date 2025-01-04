import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MemberDetails from './analyzer/MemberDetails';
import UserRoles from './analyzer/UserRoles';
import CollectorInfo from './analyzer/CollectorInfo';
import DatabaseConfig from './analyzer/DatabaseConfig';

interface AnalysisResult {
  memberDetails?: any;
  userRoles?: any[];
  collectorStatus?: any;
  dbConfig?: {
    tables: any[];
    policies: any[];
  };
  errors: string[];
}

const MemberAnalyzer = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeMember = async () => {
    setLoading(true);
    setResult(null);
    const errors: string[] = [];

    try {
      // 1. Check member details
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('*')
        .eq('member_number', memberNumber.trim())
        .maybeSingle();

      if (memberError) {
        errors.push(`Member query error: ${memberError.message}`);
      }

      let rolesData = null;
      let collectorData = null;

      if (memberData?.auth_user_id) {
        // 2. Check user roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', memberData.auth_user_id);

        if (rolesError) {
          errors.push(`Roles query error: ${rolesError.message}`);
        } else {
          rolesData = roles;
        }
      }

      // 3. Check collector status if applicable
      if (memberData?.collector_id) {
        const { data: collector, error: collectorError } = await supabase
          .from('members_collectors')
          .select('*')
          .eq('id', memberData.collector_id)
          .maybeSingle();

        if (collectorError) {
          errors.push(`Collector query error: ${collectorError.message}`);
        } else {
          collectorData = collector;
        }
      }

      // 4. Fetch database configuration
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables_info');

      const { data: policies, error: policiesError } = await supabase
        .rpc('get_rls_policies');

      if (tablesError) {
        errors.push(`Tables query error: ${tablesError.message}`);
      }
      if (policiesError) {
        errors.push(`Policies query error: ${policiesError.message}`);
      }

      setResult({
        memberDetails: memberData || null,
        userRoles: rolesData,
        collectorStatus: collectorData,
        dbConfig: {
          tables: tables || [],
          policies: policies || []
        },
        errors
      });

      toast({
        title: "Analysis Complete",
        description: errors.length > 0 ? "Analysis completed with some errors" : "Analysis completed successfully",
        variant: errors.length > 0 ? "destructive" : "default",
      });

    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
      setResult({
        errors: [error.message]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Enter member number"
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value)}
            className="max-w-sm"
          />
          <Button 
            onClick={analyzeMember} 
            disabled={loading || !memberNumber.trim()}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
        
        {result && (
          <ScrollArea className="h-[500px] w-full rounded-md border">
            {result.errors.length > 0 && (
              <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <h3 className="text-red-500 font-semibold mb-2">Issues Found:</h3>
                <ul className="list-disc pl-4">
                  {result.errors.map((error, index) => (
                    <li key={index} className="text-red-400">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <MemberDetails memberDetails={result.memberDetails} />
            <UserRoles roles={result.userRoles || []} />
            <CollectorInfo collectorStatus={result.collectorStatus} />
            <DatabaseConfig 
              tables={result.dbConfig?.tables || []} 
              policies={result.dbConfig?.policies || []} 
            />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberAnalyzer;