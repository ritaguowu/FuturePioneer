import React from "react";
import { StyleSheet } from "react-native";

import AppDetailText from "../AppDetailText";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppDetailText style={styles.error}>{error}</AppDetailText>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});

export default ErrorMessage;
