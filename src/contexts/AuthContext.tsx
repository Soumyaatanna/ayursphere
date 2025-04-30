
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Types
export type Role = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar?: string;
  bio?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@ayursphere.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: 'Administrator of AyurSphere'
  },
  {
    id: '2',
    username: 'ayurveda_lover',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayurveda',
    bio: 'Passionate about Ayurvedic remedies'
  }
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading user from localStorage on app init
  useEffect(() => {
    const storedUser = localStorage.getItem('ayursphere_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ayursphere_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ayursphere_user');
    }
  }, [currentUser]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, you would verify the password here
      setCurrentUser(user);
      toast.success('Logged in successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: `${MOCK_USERS.length + 1}`,
        username,
        email,
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      };
      
      // In a real app, you would save this to the database
      // For demo, we'll just set it as current user
      setCurrentUser(newUser);
      toast.success('Registered successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
