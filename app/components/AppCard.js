import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { TouchableWithoutFeedback } from "react-native";

function AppCard({ title, price, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.localImage} source={image} />
        <View style={styles.info}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.price}>{price}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 280,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  localImage: {
    width: "90%",
    height: 200,
    margin: 20,
  },
  title: {
    fontSize: 15,
    color: colors.darkblack,
  },
  price: {
    marginBottom: 7,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  info: {
    paddingLeft: 30,
    alignItems: "flex-start",
  },
});

export default AppCard;
