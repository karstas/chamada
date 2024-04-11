import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapViewComponent({ scannedData, markers }) {
  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        style={styles.map}
        initialRegion={{
          latitude: -22.35995,
          longitude: -43.59809,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}

        {scannedData && (
          <Marker
            coordinate={{
              latitude: scannedData.latitude,
              longitude: scannedData.longitude,
            }}
            title="Local do Scanner"
            description="Local onde o QR Code foi escaneado"
          />
        )}
      </MapView>
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
    height: "100%",
  },
});
