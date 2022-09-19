import React from "react";
import colors from "../config/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({ title, onPress, color = "secondary", style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
    height: 30,
  },
  text: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
