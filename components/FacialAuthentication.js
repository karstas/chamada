import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function FacialAuthentication({ onSuccess, onCancel }) {
  const authenticateFacial = async () => {
    const hasBiometric = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (hasBiometric && supportedTypes.length > 0) {
      const result = await LocalAuthentication.authenticateAsync({});

      if (result.success) {
        onSuccess();
      } else {
        console.log("Falha na autenticação facial");
      }
    } else {
      console.log("Ocorreu um erro ao tentar autenticar com a biometria");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={authenticateFacial}>
        <Text style={styles.buttonText}>Autenticação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
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
});
