import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  idCardNumber?: string;
  reportsSubmitted?: number;
  pointsEarned?: number;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check for saved auth data in localStorage
    const savedUser = localStorage.getItem('locateHopeUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, mocking authentication
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in a real app this would come from backend
    const mockUser = {
      id: '123456',
      name: 'Arjun Sharma',
      email: email,
      reportsSubmitted: 5,
      pointsEarned: 250
    };
    
    setCurrentUser(mockUser);
    localStorage.setItem('locateHopeUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user registration
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      reportsSubmitted: 0,
      pointsEarned: 0
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('locateHopeUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const demoLogin = async () => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user
    const demoUser = {
      id: 'demo123',
      name: 'Demo User',
      email: 'demo@locatehope.in',
      reportsSubmitted: 3,
      pointsEarned: 150
    };
    
    setCurrentUser(demoUser);
    localStorage.setItem('locateHopeUser', JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('locateHopeUser');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    demoLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};