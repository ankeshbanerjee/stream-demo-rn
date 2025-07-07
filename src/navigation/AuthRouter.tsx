import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./params";
import { RegisterScreen } from "../screens/RegisterScreen";
import { LoginScreen } from "../screens/LoginScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthRouter() {
  return (
    <Stack.Navigator
      initialRouteName="LOGIN"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LOGIN" component={LoginScreen} />
      <Stack.Screen name="REGISTER" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
