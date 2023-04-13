import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

// import { useUser } from "../Context";

export const CustomBtn = ({ navigation }) => {
  // const { logOut } = useUser();

  const exit = () => {
    // logOut();
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={exit}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});
