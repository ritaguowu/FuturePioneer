import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppCard from "../components/AppCard";

const courses = [
  {
    id: 1,
    title: "Scrath",
    price: 200,
    image: require("../assets/scratch.jpg"),
    detail:
      "6 - 9yo: At this stage, children can use some visual programming " +
      "tools to complete a few complex tasks. The highly recommended " +
      "software is Scratch. It is the world's most mainstream programming " +
      "software for children -- it's simple, fun, and entertaining. It is " +
      "definitely the first choice for children's programming " +
      "enlightenment!",
  },
  {
    id: 2,
    title: "Python",
    price: 200,
    image: require("../assets/python.jpeg"),
    detail:
      "9 - 16yo: 9yo children can start to learn" +
      "Python programming language. It is an object-oriented programming language. " +
      "Compared with other languages, it is easier to learn and read. It's also portable, " +
      "expandable, and embeddable, which makes it suitable for rapid development. With a " +
      "high readability, it's easier for children to understand.",
  },
];

function CoursesScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={courses}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            title={item.title}
            price={"$" + item.price}
            image={item.image}
            detail={item.detail}
            onPress={() => navigation.push("CourseDetail", item)}
          />
        )}
      ></FlatList>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkwhite,
  },
});

export default CoursesScreen;
