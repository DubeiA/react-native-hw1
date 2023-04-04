import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostsScreen = ({ navigation, route }) => {
  // const data = route.params;
  // console.log(data);
  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>
      {/* <Text> {data} </Text> */}
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

export default PostsScreen;
