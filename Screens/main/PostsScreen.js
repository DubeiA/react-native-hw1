import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useUser } from "../Context";

const PostsScreen = () => {
  const { username } = useUser();
  console.log("Posts-username", username);
  // const data = route.params;
  // console.log("Posts", roure);
  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>
      <Text> {username.email} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
});

export default PostsScreen;
