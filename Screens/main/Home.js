import React from "react";
import { StyleSheet, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import { PostsScreenNavigate } from "./PostsScreenNavigate";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { CustomBtn } from "./CustomBtn";

export const Home = ({ navigation, route }) => {
  const data = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          ...Platform.select({
            ios: {
              height: 100,
            },
            android: {
              height: 70,
            },
          }),

          backgroundColor: "#fff",
          paddingHorizontal: 65,

          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        options={{
          headerBackVisible: true,
          headerShown: false,
          title: "Posts",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
            backgroundColor: "#e8e8e8",
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
          },
          headerTitle: { color: "#212121" },

          tabBarIconStyle: {},

          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#ff6c00",

          tabBarItemStyle: {
            borderRadius: 70,
            justifyContent: "center",
            marginBottom: 15,
            marginTop: 15,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
        }}
        name="PostsNavigate"
        component={PostsScreenNavigate}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "#e8e8e8",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
          },
          headerTitle: { color: "#212121" },
          headerTitleAlign: "center",

          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#ff6c00",
          tabBarItemStyle: {
            borderRadius: 70,
            justifyContent: "center",
            marginBottom: 15,
            marginTop: 15,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={33} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "#e8e8e8",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
          },
          headerTitle: { color: "#212121" },
          headerTitleAlign: "center",

          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#ff6c00",
          tabBarHideOnKeyboard: true,
          tabBarItemStyle: {
            borderRadius: 70,
            justifyContent: "center",
            marginBottom: 15,
            marginTop: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="user" size={size} color={color} />
          ),
          headerRight: () => <CustomBtn />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
