import { TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";

export const CustomBtn = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      <Feather name="log-out" size={24} color="black" />
    </TouchableWithoutFeedback>
  );
};
