import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(true);
  const [isShowKeyboardIOS, setIsShowKeyboardIOS] = useState(true);

  const { postId, pictures } = route.params;
  const name = useSelector((state) => state.auth);
  const touch = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(true);
    setIsShowKeyboardIOS(true);
  };

  // console.log(postId);

  const inputOpen = (value) => {
    // setIsShowKeyboard(false);
    setComments((prevComments) => ({
      ...prevComments,
      name: value,
    }));
  };

  const createPost = async () => {
    const postsCollection = await collection(db, "posts");
    const newPostRef = await doc(postsCollection, postId);
    const newColec = await collection(newPostRef, "comments");
    // const newPostData = comments;

    await addDoc(newColec, { comment: comments.name, nick: name.nickname });

    await setComments("");
  };

  const getAllComments = async () => {
    const postsCollection = await collection(db, "posts");
    const newPostRef = await doc(postsCollection, postId);
    const newColec = await collection(newPostRef, "comments");

    await onSnapshot(newColec, (snapshot) => {
      // console.log(snapshot);
      setAllComments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  // const dateNow = time.toLocaleString();

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={touch}>
      <View style={styles.container}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        > */}
        <Image source={{ uri: pictures }} style={styles.photo}></Image>

        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                // borderWidth: 1,
                marginTop: 24,

                backgroundColor: "#e8e8e8",
                marginHorizontal: 15,
                borderRadius: 5,
                // paddingLeft: 10,
                // paddingRight: 10,
                padding: 8,
              }}
            >
              <Text style={{ padding: 2 }}>{item.comment}</Text>
              <Text style={{ marginLeft: "auto", padding: 2 }}>
                {item.nick}
              </Text>
              {/* <Text>{item.time}</Text>
              {console.log(item.time)} */}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View
        // style={
        //   Platform.OS === "ios"
        //     ? {
        //         ...styles.containerRegister,
        //         height: isShowKeyboardIOS ? 600 : 350,
        //       }
        //     : {
        //         ...styles.containerRegister,
        //         marginTop: isShowKeyboard ? 480 : 260,
        //       }
        // }
        >
          <TextInput
            style={styles.input}
            placeholder="Comment"
            onBlur={() => {
              setIsShowKeyboard(true);
            }}
            onFocus={() => {
              setIsShowKeyboard(false);
            }}
            value={comments.name}
            onChangeText={inputOpen}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
            <Ionicons name="arrow-up-circle-sharp" size={38} color="orange" />
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  // containerRegister: {
  //   marginTop: 480,
  // },

  photo: {
    width: 350,
    height: 180,
    borderRadius: 10,
    marginHorizontal: 28,
    marginTop: 20,
  },
  input: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,

        borderColor: "#e8e8e8",
        height: 50,
        marginHorizontal: 16,

        borderRadius: 8,

        // marginTop: 32,
        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
      },
      android: {
        borderWidth: 2,

        borderColor: "#e8e8e8",
        height: 50,
        marginHorizontal: 16,

        // marginBottom: 80,
        paddingLeft: 20,
        borderRadius: 8,
        // justifyContent: "flex-end",
        marginBottom: 10,

        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
      },
    }),
  },
  sendBtn: { position: "absolute", right: 25, top: 5 },
});

export default CommentsScreen;
