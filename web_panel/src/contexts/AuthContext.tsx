import React, { createContext, useContext, useState } from 'react';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hardcode a logged-in user so the dashboard works fully without authentication
  const defaultUser: User = {
    uid: 'krishnasinghprojects',
    email: 'admin@ecosync.com',
    displayName: 'EcoSync Admin',
    photoURL: null
  };

  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);
  const loading = false;

  const signup = async () => {};
  const login = async () => { setCurrentUser(defaultUser); };
  const signInWithGoogle = async () => { setCurrentUser(defaultUser); };
  const logout = async () => { setCurrentUser(null); };

  const value = {
    currentUser,
    login,
    signup,
    signInWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};