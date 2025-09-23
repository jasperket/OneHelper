import { createContext, useContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user?: string;
  refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  refreshAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);
