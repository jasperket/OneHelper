import { AuthContext } from "@/hooks/useAuth";
import { Check } from "@/services/authClient";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string>();

  const checkAuth = async () => {
    try {
      const data = await Check();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(undefined);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        checkAuth();
      },
      5 * 60 * 1000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, refreshAuth: checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
