import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CustomBtn } from "./CustomBtn";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

export const Home = ({ navigation, route }) => {
  const { login, email, password } = route.params;
  console.log("Home---", login, email, password);

  return email ? (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
          headerRight: () => <CustomBtn navigation={navigation} />,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={33} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  ) : (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>You have not Registrated or Log In . Tap to go Back</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
