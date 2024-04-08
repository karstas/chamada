import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  function handleOpenCamera() {
    setIsCameraOpen(true);
  }

  return (
    <View style={styles.container}>
      {isCameraOpen ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCameraOpen(false)}
            >
              <Text style={styles.text}>Fechar Câmera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
            <Text style={styles.text}>Abrir Câmera</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
