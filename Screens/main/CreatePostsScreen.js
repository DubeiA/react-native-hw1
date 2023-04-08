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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";

const info = {
  name: "",
  locate: "",
};

const CreatePostsScreen = () => {
  // const [isFotoAppload, setIsFotoAppload] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [infoPhoto, setInfoPhoto] = useState(info);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // console.log(infoPhoto);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

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
      // console.log(photo);
    }
  };

  const reTakePic = async () => {
    // console.log(photo);
    setPhoto(null);
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

        <View style={{}}>
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
        <View style={{ marginTop: 70 }}>
          <EvilIcons
            name="location"
            size={30}
            color="#BDBDBD"
            style={{ position: "absolute", top: 40, left: 10 }}
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

        <TouchableOpacity style={styles.publish}>
          <Text style={{ color: "#fff" }}>Publish</Text>
        </TouchableOpacity>

        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#bdbdbd",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TouchableOpacity>
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
    borderRadius: 20,
    height: 200,
    marginHorizontal: 16,
    marginTop: 32,

    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
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
        height: 200,
        width: 378,
        // marginLeft: 20,
      },
    }),
  },

  input: {
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

  publish: {
    backgroundColor: "#ff6c00",
    height: 50,
    marginTop: 120,
    marginHorizontal: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
