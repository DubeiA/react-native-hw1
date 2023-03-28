import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function LaginForm() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/photo-bgr.jpg")}
      >
        <View style={styles.containerFoto}>
          <TouchableOpacity style={styles.btnAddFoto}>
            <Text style={styles.textBtn}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerRegister}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Registration</Text>
          </View>
          <View style={styles.form}>
            <View>
              <TextInput style={styles.input} placeholder="Login" />
            </View>
            <View>
              <TextInput style={styles.input} placeholder="Email" />
            </View>
            <View>
              <TextInput style={styles.input} placeholder="Password" />
            </View>
            <TouchableOpacity style={styles.registrationBtn}>
              <Text style={styles.registrationTitle}>Registration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  containerFoto: {
    position: "relative",
    zIndex: 2,
    top: 60,
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },

  btnAddFoto: {
    position: "absolute",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    width: 24,
    bottom: 14,
    right: -12,
    borderColor: "#ff6c00",

    // color: "FF6C00",
  },

  textBtn: {
    color: "#FF6C00",
  },
  containerRegister: {
    // flex: 1,
    height: 460,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  header: {
    alignItems: "center",
    marginTop: 80,
    color: "#212121",
    // marginBottom: 120,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    fontWeight: 500,
    marginBottom: 16,
    // color: "#f0f8ff",
    // fontFamily: "DMMono-Regular",
  },

  input: {
    // flex: 1,

    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#f0f8ff",
    height: 50,
    borderRadius: 6,
    paddingLeft: 16,
    marginTop: 16,
    // justifyContent: "center",
    // alignItems: "center",

    color: "#f0f8ff",
  },
  form: {
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
  },
});
