import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

import { useSelector } from "react-redux";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const userName = useSelector((state) => state);

  console.log("Post", posts);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <View style={styles.postContainer}>
          <Image
            style={styles.foto}
            source={require("../../assets/images/Rectangle.jpg")}
          />
        </View>
        <View style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>{userName.auth.nickname}</Text>

          <Text style={{ right: 3 }}> {userName.auth.email} </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              ...Platform.select({
                ios: {
                  marginTop: 32,
                  marginHorizontal: 12,
                },
                android: {
                  marginTop: 32,
                  marginHorizontal: 30,
                },
              }),
            }}
          >
            <Image
              source={{ uri: item.post.pic }}
              style={{ width: 350, height: 200, borderRadius: 10 }}
            ></Image>
            {/* {console.log(item.post.pic)} */}
            <Text style={{ fontWeight: "bold" }}>
              {item.post.infoPhoto.name}
            </Text>
            {/* <Text>{[item.location.latitude, item.location.longitude]}</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    pictures: item.post.pic,
                  })
                }
              >
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", { location: item.post.location })
                }
              >
                {item.post.infoPhoto.locate ? (
                  <View style={{ borderBottomWidth: 1 }}>
                    <EvilIcons
                      name="location"
                      size={30}
                      color="#BDBDBD"
                      style={styles.locationIcon}
                    />
                    <Text>{item.post.infoPhoto.locate}</Text>
                  </View>
                ) : (
                  <View style={{ borderBottomWidth: 1 }}>
                    <EvilIcons
                      name="location"
                      size={30}
                      color="#BDBDBD"
                      style={styles.locationIcon}
                    />
                    <Text>Location</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },

  locationIcon: {
    position: "absolute",
    left: -30,
    top: -6,
  },

  postContainer: {
    display: "flex",

    marginTop: 10,
    marginHorizontal: 15,
  },

  text: {
    position: "absolute",
    marginLeft: 90,
    marginTop: 20,
  },

  foto: { width: 60, height: 60 },
});

export default PostsScreen;
