import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCodeScanner from "./components/QRcodeScanner";
import BiometricAuthentication from "./components/BiometricAuthentication";
import MapViewComponent from "./components/MapView";

export default function App() {
  const [scannedData, setScannedData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  function handleOpenScanner() {
    setIsScannerOpen(true);
  }

  function handleCloseScanner() {
    setIsScannerOpen(false);
  }

  function handleBiometricSuccess() {
    setIsAuthenticated(true);
  }

  const markers = scannedData
    ? [
        {
          coordinate: {
            latitude: scannedData.latitude,
            longitude: scannedData.longitude,
          },
          title: "Local do Scanner",
          description: "Local onde o QR Code foi escaneado",
        },
      ]
    : [];

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <BiometricAuthentication
          onSuccess={handleBiometricSuccess}
          onCancel={() => {}}
        />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
            <Text style={styles.buttonText}>Abrir Scanner</Text>
          </TouchableOpacity>
          {isScannerOpen && (
            <View style={styles.scannerContainer}>
              <QRCodeScanner onClose={handleCloseScanner} />
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => setScannedData(null)}
              >
                <Text style={styles.buttonText}>Escanear Novamente</Text>
              </TouchableOpacity>
            </View>
          )}
          <MapViewComponent scannedData={scannedData} markers={markers} />
        </>
      )}
      {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Type: {scannedData.type}</Text>
          <Text style={styles.scannedDataText}>Data: {scannedData.data}</Text>
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
  scannerContainer: {
    flex: 1,
    width: "100%",
  },
  scanAgainButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 160,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
