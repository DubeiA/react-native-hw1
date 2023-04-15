import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";

const info = {
  name: "",
  locate: "",
};

const CreatePostsScreen = ({ navigation }) => {
  // const [isFotoAppload, setIsFotoAppload] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [infoPhoto, setInfoPhoto] = useState(info);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // console.log(infoPhoto);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePic = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
    const { coords } = await Location.getCurrentPositionAsync({});

    setLocation(coords);
    console.log("TakePicLoc", location);
  };

  const reTakePic = () => {
    // console.log(photo);
    setPhoto(null);
    // setLocation(null);
  };

  const publishPhoto = () => {
    console.log(location);
    if (photo) {
      navigation.navigate("Posts", { photo, infoPhoto, location });
      setInfoPhoto(info);
      setPhoto(null);
      return;
    }
    alert("make Foto");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Camera
          style={styles.containerCamera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo && (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.donePhoto} />
            </View>
          )}
          {photo ? (
            <TouchableOpacity style={styles.cameraBtn} onPress={reTakePic}>
              <View style={styles.cameraBgrBtn}>
                <MaterialCommunityIcons
                  style={styles.iconStylePosition}
                  name="camera-retake-outline"
                  size={24}
                  color="grey"
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cameraBtn} onPress={takePic}>
              <View style={styles.cameraBgrBtn}>
                <Ionicons
                  style={styles.iconStylePosition}
                  name="camera-outline"
                  size={24}
                  color="grey"
                />
              </View>
            </TouchableOpacity>
          )}
        </Camera>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            // onBlur={}
            // onFocus={}
            value={infoPhoto.name}
            onChangeText={(value) =>
              setInfoPhoto((prevInfoPhoto) => ({
                ...prevInfoPhoto,
                name: value,
              }))
            }
          />
        </View>
        <View style={styles.locationInput}>
          <EvilIcons
            name="location"
            size={30}
            color="#BDBDBD"
            style={styles.locationIcon}
          />
          <TextInput
            style={[styles.input, { paddingLeft: 25 }]}
            placeholder="Location"
            // onBlur={}
            // onFocus={}
            value={infoPhoto.locate}
            onChangeText={(value) =>
              setInfoPhoto((prevInfoPhoto) => ({
                ...prevInfoPhoto,
                locate: value,
              }))
            }
          />
        </View>

        <TouchableOpacity style={styles.publish} onPress={publishPhoto}>
          <Text style={styles.publishBtnText}>Publish</Text>
        </TouchableOpacity>

        <View style={styles.deleteBtn}>
          <TouchableOpacity
            onPress={() => {
              setPhoto(null);
              setInfoPhoto(info);
              setLocation(null);
            }}
          >
            <Ionicons name="trash-outline" size={24} color="#e8e8e8" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerCamera: {
    ...Platform.select({
      ios: {
        borderRadius: 20,
        height: 200,
        marginHorizontal: 16,
        marginTop: 32,

        backgroundColor: "#e8e8e8",
        justifyContent: "center",
        alignItems: "center",
      },
      android: {
        borderRadius: 20,
        height: 160,
        marginHorizontal: 16,
        marginTop: 16,

        backgroundColor: "#e8e8e8",
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  },

  iconStylePosition: {
    marginTop: 12,
    marginLeft: 13,
  },

  cameraBgrBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },

  photoContainer: {
    ...Platform.select({
      ios: {
        position: "absolute",
        top: 150,
        left: 70,

        borderColor: "#fff",
        borderWidth: 1,
      },
      android: {
        position: "absolute",
        height: 200,
        width: 444,
        left: 0,
        // marginLeft: 20,
      },
    }),
  },

  donePhoto: {
    ...Platform.select({
      ios: {
        position: "absolute",
        top: -151,
        left: -71,
        // borderRadius: 20,
        height: 200,
        width: 344,
        // marginHorizontal: 16,
        // marginTop: 32,

        justifyContent: "center",
        alignItems: "center",
      },
      android: {
        marginTop: 16,
        height: 160,
        width: 378,
        // borderRadius: 20,
        // marginLeft: 20,
      },
    }),
  },

  input: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,

        borderColor: "#e8e8e8",
        height: 50,
        marginHorizontal: 16,

        borderRadius: 8,

        marginTop: 32,
        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
      },
      android: {
        borderBottomWidth: 2,

        borderColor: "#e8e8e8",
        height: 50,
        marginHorizontal: 16,

        borderRadius: 8,

        marginTop: 8,
        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
      },
    }),
  },

  locationInput: { marginTop: 70 },

  locationIcon: {
    ...Platform.select({
      ios: {
        position: "absolute",
        top: 40,
        left: 10,
      },
      android: {
        position: "absolute",
        top: 20,
        left: 10,
      },
    }),
  },

  publish: {
    ...Platform.select({
      ios: {
        backgroundColor: "#ff6c00",
        height: 50,
        marginTop: 120,
        marginHorizontal: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
      },
      android: {
        backgroundColor: "#ff6c00",
        height: 50,
        marginTop: 100,
        marginHorizontal: 60,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  },

  deleteBtn: {
    ...Platform.select({
      ios: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#bdbdbd",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        marginLeft: "auto",
        marginRight: "auto",
      },
      android: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#bdbdbd",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        marginLeft: "auto",
        marginRight: "auto",
      },
    }),
  },

  publishBtnText: {
    color: "#fff",
  },
});

export default CreatePostsScreen;
