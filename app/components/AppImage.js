import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function AppImage({ title, image }) {
  return (
    <View style={styles.imageformat}>
      <Image style={styles.localImage} source={image} />
      <AppText style={styles.title}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  imageformat: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingTop: 20,
    // paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 40,
  },
  localImage: {
    width: "90%",
    height: 200,
    margin: 20,
  },
  title: {
    marginBottom: 7,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.darkblack,
  },
});

export default AppImage;
