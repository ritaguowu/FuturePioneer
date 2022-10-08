import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import Screen from "../components/Screen";

function NotificationScreen(props) {
  return (
    <Screen>
      <View>
        <Text>NotificationScreen</Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});

export default NotificationScreen;
