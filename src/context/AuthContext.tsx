// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { storage } from "../utils/storage.utils";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  client: StreamVideoClient | null;
  initClient: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  const initClient = async () => {
    const token = storage.getData(storage.KEY.STREAM_TOKEN);
    const userId = storage.getData(storage.KEY.USER_ID);
    console.log("token", token);
    console.log("userId", userId);
    const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
    if (token && userId && apiKey) {
      const newUser = { id: userId };
      const streamClient = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user: newUser,
        tokenProvider: () => Promise.resolve(token),
      });
      setUser(newUser);
      setClient(streamClient);
    } else {
      setUser(null);
      setClient(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, client, initClient }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
