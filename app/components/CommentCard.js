import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import AppDetailText from "./AppDetailText";
import { Image } from "react-native-expo-image-cache";
import ListItem from "../components/ListItem";
import EnrollListItem from "./EnrollListItem";
import { ScrollView } from "react-native-gesture-handler";

function CommentCard({
  course,
  level,
  imageUrl,
  description,
  thumbanilUrl,
  userName,
  userImageUrl,
}) {
  return (
    <ScrollView>
      <View style={styles.card}>
        <EnrollListItem title={userName} imageUrl={userImageUrl} />
        <View style={styles.info}>
          {course && (
            <AppDetailText style={styles.text}>{course}</AppDetailText>
          )}
          {level && <AppDetailText style={styles.text}>{level}</AppDetailText>}
          {/* <AppDetailText>{subTitle}</AppDetailText> */}
          <AppDetailText style={styles.text}>{description}</AppDetailText>
        </View>
        {/* <Image
        style={styles.localImage}
        tint="light"
        preview={{ uri: thumbanilUrl }}
        uri={imageUrl}
      /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 100,
  },
  localImage: {
    width: "90%",
    height: 200,
    margin: 20,
  },
  text: {
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

export default CommentCard;
