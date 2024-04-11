import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapViewComponent({ scannedData, markers }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão da localização negada!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        region={
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
        style={styles.map}
      >
        <Marker
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
          title="Eu estou aqui!"
          description="Nosso local de aula."
        />
      </MapView>
      <Text style={styles.paragraph}>{errorMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  paragraph: {
    fontSize: 16,
    color: "red",
  },
});
