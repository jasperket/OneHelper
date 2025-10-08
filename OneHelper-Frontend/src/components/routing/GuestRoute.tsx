import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/pages/LoadingPage";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;
  return !isAuthenticated ? children : <Navigate to="/todo" replace />;
}
