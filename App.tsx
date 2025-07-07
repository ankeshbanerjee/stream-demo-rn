import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Router } from "./src/navigation/Router";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { StreamVideo } from "@stream-io/video-react-native-sdk";
import { RingingCalls } from "./src/screens/RingingCall/RingingCall";

export default function App() {
  return (
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      <AuthProvider>
        <AppWithStream />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

function AppWithStream() {
  const { client } = useAuth();

  if (!client) {
    return <Router />;
  }

  return (
    <StreamVideo client={client}>
      <Router />
      <RingingCalls />
    </StreamVideo>
  );
}
