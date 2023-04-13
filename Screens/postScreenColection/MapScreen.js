import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  // console.log("Map Route", route.params.location.location);
  const loc = route.params.location.location;

  console.log(loc.latitude);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: loc.latitude,
            longitude: loc.longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
