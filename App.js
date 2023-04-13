import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "./Screens/autu/LoginScreen";
import { RegistrationScreen } from "./Screens/autu/RegistrationScreen";
import { Home } from "./Screens/main/Home";

import { Provider } from "react-redux";
import { store } from "./redux/auth/store";

const Stack = createStackNavigator();

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

export default function App() {
  const [isUser, setIsUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setIsUser(user);
    console.log("app.", user);
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
