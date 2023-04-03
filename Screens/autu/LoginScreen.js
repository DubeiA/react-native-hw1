import { useState, useCallback } from "react";

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

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

initialState = {
  email: "",
  password: "",
};

export function LoginScreen({ navigation }) {
  const [focusEmail, setFocusEmail] = useState("#e8e8e8");
  const [focusPassword, setFocusPassword] = useState("#e8e8e8");
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [data, setData] = useState(initialState);
  // let [fontsLoaded] = useFonts({
  //   "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  //   "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onFocusEmail = () => {
    setFocusEmail("#ff6c00");
    setIsShowKeyboard(true);
  };
  const onFocusPassword = () => {
    setFocusPassword("#ff6c00");
    setIsShowKeyboard(true);
  };
  const onBlur = () => {
    setFocusEmail("#e8e8e8");
    setFocusPassword("#e8e8e8");
    setIsShowKeyboard(true);
  };

  const touch = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(true);
  };

  const submitForm = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(true);
    console.log(data);
    setData(initialState);
  };

  const navigateTo = () => {
    navigation.navigate("Registration");
    setIsShowKeyboard(false);
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
              style={{
                ...styles.containerRegister,
                marginBottom: isShowKeyboard ? 0 : 60,
              }}
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
    // alignItems: "center",
  },

  addBtn: {
    position: "absolute",
    alignItems: "center",
    width: 25,
    bottom: 13,
    right: -12,
  },
  containerRegister: {
    // flex: 1,
    height: 450,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  header: {
    alignItems: "center",
    marginTop: 32,

    // marginBottom: 120,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 35,

    fontWeight: 500,
    marginBottom: 16,
    color: "#212121",

    // fontFamily: "Montserrat-Regulat",
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
    // fontFamily: "Montserrat-Regulat",

    color: "#212121",
  },

  form: {
    // justifyContent: "flex-end",
    flex: 1,
    marginHorizontal: 16,
  },
  inputTitle: {
    // flex: 1,
  },
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
    // fontFamily: "Montserrat-Regulat",
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
    // fontFamily: "Montserrat-Regulat",
  },

  enterText: {
    textAlign: "center",
    marginTop: 15,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18.75,
    // fontFamily: "Montserrat-Regulat",
  },
});
