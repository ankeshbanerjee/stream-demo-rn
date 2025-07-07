import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "./params";
import { HomeScreen } from "../screens/HomeScreen";
import { useAuth } from "../context/AuthContext";
import { StreamVideo } from "@stream-io/video-react-native-sdk";
import { RingingCalls } from "../screens/RingingCall/RingingCall";

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainRouter() {
  const { client } = useAuth();
  return (
    <StreamVideo client={client!!}>
      <Stack.Navigator
        initialRouteName="HOME"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HOME" component={HomeScreen} />
      </Stack.Navigator>
      <RingingCalls />
    </StreamVideo>
  );
}
