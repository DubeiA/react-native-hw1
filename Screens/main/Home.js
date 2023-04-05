import React from "react";
import { StyleSheet } from "react-native";
import { CustomBtn } from "./CustomBtn";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

// import { useUser } from "../Context";

export const Home = ({ navigation, route }) => {
  // const { login, email, password } = route.params;
  // console.log("Home---", login, email, password);
  // console.log(contacts);

  // const { isLoggedIn, username, logIn, logOut } = useUser();
  // console.log("Home-username", username);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 75,

          backgroundColor: "#fff",
          paddingHorizontal: 65,
          // paddingBottom: 30,
          // justifyContent: "space-evenly",
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            fontWeight: 500,
          },
          headerTitle: { color: "#212121" },

          tabBarIconStyle: {
            // marginLeft: 30,
            // borderRadius: 10,
          },

          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#ff6c00",
          tabBarItemStyle: {
            // borderWidth: 1,
            borderRadius: 70,
            justifyContent: "center",
            marginBottom: 15,
            marginTop: 15,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
          headerRight: () => <CustomBtn navigation={navigation} />,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            fontWeight: 500,
          },
          headerTitle: { color: "#212121" },
          headerTitleAlign: "center",

          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#ff6c00",
          tabBarItemStyle: {
            // borderWidth: 1,
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
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            fontWeight: 500,
          },
          headerTitle: { color: "#212121" },
          headerTitleAlign: "center",

          tabBarIconStyle: {
            // marginRight: 30,
            backgroundColor: "#FF6C00",
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#ff6c00",
          tabBarItemStyle: {
            // borderWidth: 1,
            borderRadius: 70,
            justifyContent: "center",
            marginBottom: 15,
            marginTop: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="user" size={size} color={color} />
          ),
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
