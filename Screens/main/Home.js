import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home = ({ route }) => {
  // const { email } = route.params;
  // const parcedata = JSON.parse(data);
  // console.log(email);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

export default Home;
