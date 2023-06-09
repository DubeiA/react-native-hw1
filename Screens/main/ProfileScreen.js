import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(
    require("../../assets/images/Rectangle.jpg")
  );
  const [userPosts, setUserPosts] = useState([]);

  const { userId } = useSelector((state) => state.auth);
  console.log("Profile", userPosts);
  useEffect(() => {
    getUserPhoto();
  }, []);

  const getUserPhoto = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    await onSnapshot(q, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.foto} source={image} />
      <TouchableOpacity>
        {image ? (
          <Image
            style={styles.closeBtn}
            source={require("../../assets/images/close.png")}
          />
        ) : (
          <Image
            style={styles.addBtn}
            source={require("../../assets/images/add.png")}
          />
        )}
      </TouchableOpacity>

      <FlatList
        data={userPosts}
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
              source={{ uri: item.pic }}
              style={{ width: 350, height: 200, borderRadius: 10 }}
            ></Image>
            {console.log(item.pic)}
            <Text style={{ fontWeight: "bold" }}>{item.infoPhoto.name}</Text>

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
                    pictures: item.pic,
                  })
                }
              >
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                {item.infoPhoto.locate ? (
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
    alignItems: "center",
  },

  foto: {
    borderRadius: 16,
    marginTop: 20,
  },

  addBtn: {
    position: "absolute",
    alignItems: "center",
    width: 25,
    bottom: 15,
    right: -72,
  },

  closeBtn: {
    position: "absolute",
    alignItems: "center",
    width: 25,
    bottom: 12,
    right: -72,
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
});

export default ProfileScreen;
