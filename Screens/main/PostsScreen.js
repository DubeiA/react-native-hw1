import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { useUser } from "../Context";

const PostsScreen = () => {
  const { username } = useUser();
  console.log("Posts-username", username);
  // const data = route.params;
  // console.log("Posts", roure);
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image
          style={styles.foto}
          source={require("../../assets/images/Rectangle.jpg")}
        />
      </View>
      <View style={styles.text}>
        {username.login ? (
          <Text style={{ fontWeight: "bold" }}>{username.login}</Text>
        ) : (
          <Text style={{ fontWeight: "bold" }}>Example with Login</Text>
        )}
        <Text style={{ right: 3 }}> {username.email} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
  },

  postContainer: {
    display: "flex",
    // flex: 1,
    marginTop: 10,
    marginHorizontal: 15,
    // alignItems: "center",
    // justifyContent: "flex-start",
    // backgroundColor: "#fff",

    // marginHorizontal: 5,
  },

  text: {
    position: "absolute",
    marginLeft: 90,
    marginTop: 20,
  },

  foto: { width: 60, height: 60 },
});

export default PostsScreen;
