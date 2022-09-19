import React from "react";
import AppDetailText from "./AppDetailText";
import { StyleSheet, View, Image } from "react-native";
import colors from "../config/colors";
import { TouchableHighlight } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

function MyEnrollListItem({
  kidName,
  grade,
  course,
  level,
  price,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.lightgrey} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={{ uri: image }} />}
            <View style={styles.infoContainer}>
              <AppDetailText style={styles.kidName}>{kidName}</AppDetailText>
              {grade && (
                <AppDetailText style={styles.subTitle}>{grade}</AppDetailText>
              )}
              <AppDetailText style={styles.subTitle}>{course}</AppDetailText>
              <AppDetailText style={styles.subTitle}>{level}</AppDetailText>
              <AppDetailText style={styles.subTitle}>${price}</AppDetailText>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.white,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "center",
    marginTop: -10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 5,
  },
  kidName: {
    marginTop: 8,
    fontWeight: "500",
    fontSize: 13,
  },
  subTitle: {
    color: colors.darkgrey,
    fontSize: 13,
  },
});
export default MyEnrollListItem;
