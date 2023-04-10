import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 48.44710289899909,
          longitude: 25.560819710877297,
          latitudeDelta: 0.001,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: 48.44710289899909,
            longitude: 25.560819710877297,
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
