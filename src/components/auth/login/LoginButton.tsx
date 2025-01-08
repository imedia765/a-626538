import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoginButtonProps {
  loading: boolean;
}

const LoginButton = ({ loading }: LoginButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full bg-dashboard-accent1 hover:bg-dashboard-accent1/90 relative"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Logging in...
        </>
      ) : (
        'Login'
      )}
    </Button>
  );
};

export default LoginButton;