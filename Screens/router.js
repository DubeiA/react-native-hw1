import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { LoginScreen } from "./autu/LoginScreen";
import { RegistrationScreen } from "./autu/RegistrationScreen";
import Home from "./main/Home";
import PostsScreen from "./main/PostsScreen";
import CreatePostsScreen from "./main/CreatePostsScreen";
import ProfileScreen from "./main/ProfileScreen";

const AuthStack = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  //   console.log(isAuth);
  if (!isAuth) {
    return (
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
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Posts"
          component={Home}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <TabNavigation.Navigator>
      {/* <TabNavigation.Screen name="Home" component={Home} /> */}
      <TabNavigation.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <TabNavigation.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="plus" size={33} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <TabNavigation.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </TabNavigation.Navigator>
  );
};
