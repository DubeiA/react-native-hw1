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

import { useUser } from "../Context";

const PostsScreen = ({ navigation, route }) => {
  const { username } = useUser();
  const location = route.params;
  //   console.log("Post Location", location);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevPosts) => [...prevPosts, route.params]);
    }
  }, [route.params]);
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
          {username.login ? (
            <Text style={{}}>{username.login}</Text>
          ) : (
            <Text style={{}}>Example with Login</Text>
          )}
          <Text style={{ right: 3 }}> {username.email} </Text>
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
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200, borderRadius: 10 }}
            ></Image>
            <Text style={{}}>{item.infoPhoto.name}</Text>
            {/* <Text>{[item.location.latitude, item.location.longitude]}</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Map", { location })}
              >
                {item.infoPhoto.locate.length > 1 ? (
                  <View style={{ borderBottomWidth: 1 }}>
                    <EvilIcons
                      name="location"
                      size={30}
                      color="#BDBDBD"
                      style={styles.locationIcon}
                    />
                    <Text>{item.infoPhoto.locate}</Text>
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
