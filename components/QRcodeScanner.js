import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

export default function QRCodeScanner({ onClose }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function handleBarCodeScanned({ type, data }) {
    setScannedData({ type, data });
    onClose(data);
  }

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requisitando permissão de câmera</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>Acesso a câmera negado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Type: {scannedData.type}</Text>
          <Text style={styles.scannedDataText}>Data: {scannedData.data}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScannedData(null)}
          >
            <Text style={styles.buttonText}>Escanear Novamente</Text>
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
    width: 200,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  scannedDataContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    marginTop: "auto",
    marginBottom: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  scannedDataText: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
});
