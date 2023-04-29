import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperation";
import { useDispatch } from "react-redux";

export const CustomBtn = ({ navigation }) => {
  const dispatch = useDispatch();

  const exit = () => {
    dispatch(authSignOutUser());
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
