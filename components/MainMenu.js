import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../Screens/autu/LoginScreen";
import { RegistrationScreen } from "../Screens/autu/RegistrationScreen";
import { Home } from "../Screens/main/Home";

import { useDispatch, useSelector } from "react-redux";

import { authStateChangeUser } from "../redux/auth/authOperation";

const Stack = createStackNavigator();

export const MainMenu = () => {
  const select = useSelector((state) => state);
  const dispatch = useDispatch();
  //   console.log("select", select.auth.stateChange);
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {select.auth.stateChange ? (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
