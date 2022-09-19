import React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import AppText from "../components/AppText";

import { useNavigation } from "@react-navigation/native";
import LoginNavigator from "../navigation/LoginNavigator";

function WelcomeScreen() {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate(LoginNavigator);
  }, 1000);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.png")}
    >
      <AppText style={styles.text}>Enrich Your Mind!</AppText>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_left.png")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 400,
    position: "absolute",
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  text: {
    marginBottom: 630,
  },
});

export default WelcomeScreen;
