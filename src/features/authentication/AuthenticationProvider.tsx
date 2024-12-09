import React, { createContext, useContext, useState } from "react";

// TODO -> break this provider in 2 parts. One that provides methods to login and logout and one that
// provides the user data + isAuthenticated property

// TODO -> Persist a logged in user for a while so he does not have to log in every time page is reloaded

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
  refreshToken: string;
};

export interface AuthenticationContext {
  isAuthenticated: boolean;
  user?: User;
  refreshAccessToken: (token: string) => void;
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

  const refreshAccessToken = (token: string) => {
    setUser(user ? { ...user, accessToken: token } : undefined);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, user, refreshAccessToken, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
