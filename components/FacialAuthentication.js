import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function FacialAuthentication({ onSuccess, onCancel }) {
  const [authType, setAuthType] = useState(null);

  const authenticateBiometric = async () => {
    const result = await LocalAuthentication.authenticateAsync({});
    if (result.success) {
      onSuccess();
    } else {
      console.log("Falha na autenticação biométrica");
    }
  };

  const authenticateFacial = async () => {
    const hasFacial = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (
      hasFacial &&
      supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      )
    ) {
      const result = await LocalAuthentication.authenticateAsync({
        authenticationType:
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
      });

      if (result.success) {
        onSuccess();
      } else {
        console.log("Falha na autenticação facial");
      }
    } else {
      console.log("Autenticação facial não disponível");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setAuthType("facial");
          authenticateFacial();
        }}
      >
        <Text style={styles.buttonText}>Autenticar com Facial</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setAuthType("biometric");
          authenticateBiometric();
        }}
      >
        <Text style={styles.buttonText}>Autenticar com Biometria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
      {authType && (
        <Text style={styles.infoText}>Autenticando com: {authType}</Text>
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
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
  },
});
