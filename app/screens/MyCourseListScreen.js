import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import userApi from "../api/users";
import enrollApi from "../api/enrolls";
import MyEnrollListItem from "../components/MyEnrollListItem";
import { COURSES, GRADES, LEVELS } from "../utility/constants";

function CourseListScreen(props) {
  const [courses, setCourse] = useState();
  const { user } = useAuth();
  const [userImageUrl, setUserImageUrl] = useState();

  useEffect(() => {
    loadingUsers();
    loadingEnrolls();
  }, []);

  const loadingUsers = async () => {
    const result = await userApi.getUsers();
    if (result.ok) {
      if (result.data) {
        const userImage = result.data.filter((u) => user.userId == u.id)[0]
          .image.url;
        setUserImageUrl(userImage);
      }
    }
  };

  const loadingEnrolls = async () => {
    const response = await enrollApi.getEnrolls();
    if (response.ok) {
      if (response.data) {
        const courses = response.data.filter(
          (enroll) => user.userId == enroll.userId
        );
        setCourse(courses);
      }
    }
  };

  const handlerDelete = async (enroll) => {
    const response = await enrollApi.deleteEnroll(enroll);
    //Front Interface
    const newCourses = courses.filter((c) => c.id !== enroll.id);
    setCourse(newCourses);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(courses) => courses.id.toString()}
        renderItem={({ item, index }) => (
          <MyEnrollListItem
            kidName={courses[index].kidName}
            grade={GRADES.filter((grade) => grade.id == item.gradeId).map(
              (grade) => grade.name
            )}
            course={COURSES.filter((course) => course.id == item.courseId).map(
              (course) => course.name
            )}
            level={LEVELS.filter((level) => level.id == item.levelId).map(
              (level) => level.name
            )}
            price={courses[index].price}
            image={userImageUrl}
            onPress={() => console.log("Courses", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handlerDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkwhite,
  },
});

export default CourseListScreen;
