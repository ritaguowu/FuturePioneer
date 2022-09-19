import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={styles.toolbar}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_left.png")}
        />
      </View>
      <View style={[styles.screen, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkwhite,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
  toolbar: {
    top: "3%",
    width: "100%",
    height: "15%",
    padding: "10%",
    backgroundColor: colors.lightblue,
  },
  logo: {
    paddingTop: "30%",
    width: "90%",
    height: "90%",
    position: "absolute",
  },
});

export default Screen;
