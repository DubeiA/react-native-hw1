import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "./Screens/autu/LoginScreen";
import { RegistrationScreen } from "./Screens/autu/RegistrationScreen";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        {/* <MainStack.Screen name="Home" component={Home} /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
