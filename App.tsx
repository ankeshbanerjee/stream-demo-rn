import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Router } from "./src/navigation/Router";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { StreamVideo } from "@stream-io/video-react-native-sdk";
import { RingingCalls } from "./src/screens/RingingCall/RingingCall";
import { useRef } from "react";

export default function App() {
  return (
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      <AuthProvider>
        {/* <AppWithStream /> */}
        <Router />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

// function AppWithStream() {
//   const { client } = useAuth();

//   if (!client) {
//     return <Router />;
//   }

//   return (
//     <StreamVideo client={client}>
//       <Router />
//       <RingingCalls />
//     </StreamVideo>
//   );
// }

// function AppWithStream() {
//   const { client } = useAuth();

//   return (
//     <>
//       {client && (
//         <StreamVideo client={client}>
//           <RingingCalls />
//         </StreamVideo>
//       )}
//       {/* Your existing router content */}
//       <Router />
//     </>
//   );
// }
