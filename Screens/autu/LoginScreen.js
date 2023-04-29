import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperation";

const login = {
  email: "",
  password: "",
};

export function LoginScreen({ navigation }) {
  const [focusEmail, setFocusEmail] = useState("#e8e8e8");
  const [focusPassword, setFocusPassword] = useState("#e8e8e8");
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowKeyboardIOS, setIsShowKeyboardIOS] = useState(true);

  const [data, setData] = useState(login);

  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onFocusEmail = () => {
    setFocusEmail("#ff6c00");
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(false);
  };
  const onFocusPassword = () => {
    setFocusPassword("#ff6c00");
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(false);
  };
  const onBlur = () => {
    setFocusEmail("#e8e8e8");
    setFocusPassword("#e8e8e8");
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(true);
  };

  const touch = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(true);
  };

  const submitForm = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(true);

    dispatch(authSignInUser(data));
    setData(login);
  };

  const navigateTo = () => {
    navigation.navigate("Registration");
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(true);
  };

  return (
    <TouchableWithoutFeedback onPress={touch}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photo-bgr.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={
                Platform.OS === "ios"
                  ? {
                      ...styles.containerRegister,
                      height: isShowKeyboardIOS ? 500 : 250,
                    }
                  : {
                      ...styles.containerRegister,
                      marginBottom: isShowKeyboard ? 1 : 60,
                    }
              }
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Log In</Text>
              </View>
              <View style={styles.form}>
                <View>
                  <TextInput
                    style={[styles.input, { borderColor: focusEmail }]}
                    placeholder="Email"
                    onBlur={onBlur}
                    onFocus={onFocusEmail}
                    value={data.email}
                    onChangeText={(value) =>
                      setData((prevData) => ({ ...prevData, email: value }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={[styles.input, { borderColor: focusPassword }]}
                    placeholder="Password"
                    secureTextEntry={showPassword}
                    onBlur={onBlur}
                    onFocus={onFocusPassword}
                    value={data.password}
                    onChangeText={(value) =>
                      setData((prevData) => ({ ...prevData, password: value }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.show}
                    onPress={toggleShowPassword}
                  >
                    <Text style={styles.showText}>Show</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.registrationBtn}
                  onPress={submitForm}
                >
                  <Text style={styles.registrationTitle}>Log In</Text>
                </TouchableOpacity>

                <View>
                  <TouchableOpacity style={styles.enter} onPress={navigateTo}>
                    <Text style={styles.enterText}>
                      Don't have an account? Registration
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },

  addBtn: {
    position: "absolute",
    alignItems: "center",
    width: 25,
    bottom: 13,
    right: -12,
  },
  containerRegister: {
    height: 450,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  header: {
    alignItems: "center",
    marginTop: 32,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 35,

    marginBottom: 16,
    color: "#212121",
  },

  input: {
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#e8e8e",
    height: 50,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
  },

  form: {
    flex: 1,
    marginHorizontal: 16,
  },
  inputTitle: {},
  registrationBtn: {
    marginTop: 43,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: "#ff6c00",
    alignItems: "center",
    borderRadius: 25,
  },
  registrationTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  show: {
    position: "absolute",
    right: 15,
    bottom: 16,
  },

  showText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18.75,
  },

  enterText: {
    textAlign: "center",
    marginTop: 15,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18.75,
  },
});
