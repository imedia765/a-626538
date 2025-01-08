import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRoutesProps {
  session: Session | null;
}

const ProtectedRoutes = ({ session }: ProtectedRoutesProps) => {
  const { toast } = useToast();

  // Handle navigation errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Navigation error:', event.error);
      
      // Show toast notification for navigation errors
      if (event.error?.name === 'ChunkLoadError' || event.message?.includes('Failed to fetch')) {
        toast({
          title: "Navigation Error",
          description: "There was a problem loading the page. Please try refreshing.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [toast]);

  // Get the current pathname
  const pathname = window.location.pathname;

  // If we're not on a valid route, redirect to home or login
  if (pathname !== '/' && pathname !== '/login') {
    console.log('Invalid route detected, redirecting...');
    return <Navigate to={session ? "/" : "/login"} replace />;
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              <Index />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        {/* Add a catch-all route that redirects to the appropriate page */}
        <Route
          path="*"
          element={
            <Navigate to={session ? "/" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;