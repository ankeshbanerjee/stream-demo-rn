import { SplashScreen } from "../screens/SplashScreen";
import { RootStackParamList } from "./params";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SPLASH"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SPLASH" component={SplashScreen} />
        <Stack.Screen name="AUTH" component={AuthRouter} />
        <Stack.Screen name="MAIN" component={MainRouter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
