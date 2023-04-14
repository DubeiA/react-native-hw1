import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";

// import { useUser } from "../Context";

export const CustomBtn = ({ navigation }) => {
  const dispatch = useDispatch();

  const authSignOutUser = () => async (dispatch, getState) => {
    await signOut(auth);
    console.log("s");
  };

  const exit = () => {
    // logOut();
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
