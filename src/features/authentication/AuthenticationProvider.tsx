import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  firstname: string;
  lastlame: string;
  accessToken: string;
  refreshToken: string;
};

interface AuthenticationContext {
  isAuthenticated: boolean;
  user?: User;
  login: (user: User) => void;
  logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContext | null>(null);

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(`${useAuthenticationContext.name} must be used within a ${AuthenticationProvider.name}`);
  }

  return context;
};

export const AuthenticationProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<AuthenticationContext["isAuthenticated"]>(false);
  const [user, setUser] = useState<AuthenticationContext["user"]>();

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
