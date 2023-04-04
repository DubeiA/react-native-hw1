import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "./Screens/autu/LoginScreen";
import { RegistrationScreen } from "./Screens/autu/RegistrationScreen";
import { Home } from "./Screens/main/Home";

import { DataContext } from "./Screens/Context";

const Stack = createStackNavigator();

export default function App() {
  const { userInfo, setUserInfo } = useState({});

  const formSubmitHandler = ({ login, email, password }) => {
    const addContacts = {
      login,
      email,
      password,
    };
    // setL(email);
    // console.log(addContacts);
    // const contact = setUserInfo(addContacts);
    // return addContacts;

    // setUserInfo((prevState) => [addContacts, ...prevState]);
  };

  return (
    <DataContext.Provider
      value={{
        formSubmitHandler,
      }}
    >
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
    </DataContext.Provider>
  );
}
