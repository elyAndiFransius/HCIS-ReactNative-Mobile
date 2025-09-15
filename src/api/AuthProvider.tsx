import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definisikan tipe user
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: { user: User; access_token: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// Buat context dengan tipe
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (data: { user: User; access_token: string }) => {
    setUser(data.user);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.access_token);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
