import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

export default function MapViewComponent() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão da localização negada!");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  let mapRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  if (location) {
    mapRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }

  let text = "Aguarde...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 1000,
        }}
        // style={{
        //   width: "500px",
        //   height: "500px",
        //   minheight: "200px",
        // }}
      >
        {/* <Marker
          coordinate={
            !location
              ? {
                  latitude: 0,
                  longitude: 0,
                  latitudeDelta: 0,
                  longitudeDelta: 1000,
                }
              : {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
          }
          title="Aqui"
          description="vassouras"
        /> */}
      </MapView>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "80%",

  },
});
