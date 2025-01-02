import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.rpc(
        'authenticate_member',
        { p_member_number: memberNumber }
      );

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Member not found');
      }

      // Use RLS function to authenticate
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: memberNumber + '@temp.com', // We'll use a temporary email format
        password: memberNumber, // Using member_number as password
      });

      if (signInError) throw signInError;

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-background">
      <div className="w-full max-w-md p-8 bg-dashboard-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-white">Member Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="memberNumber" className="block text-sm font-medium text-dashboard-text mb-2">
              Member Number
            </label>
            <Input
              id="memberNumber"
              type="text"
              value={memberNumber}
              onChange={(e) => setMemberNumber(e.target.value)}
              placeholder="Enter your member number"
              className="w-full"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;