import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function FacialAuthentication({ onSuccess, onCancel }) {
  async function handleAuthentication() {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirme sua identidade",
        fallbackLabel: "Use sua senha",
      });

      if (success) {
        onSuccess();
      } else {
        onCancel();
      }
    } catch (error) {
      console.error("Erro na autenticação facial:", error);
      onCancel();
    }
  }

  return (
    <TouchableOpacity onPress={handleAuthentication}>
      <Text>Autenticação Facial</Text>
    </TouchableOpacity>
  );
}
