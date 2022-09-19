import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CourseDetailScreen from "../screens/CourseDetailScreen";
import CoursesScreen from "../screens/CoursesScreen";
import EnrollScreen from "../screens/EnrollScreen";
import CommentsScreen from "../screens/CommentsScreen";

const Stack = createNativeStackNavigator();
const CourseListNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: "modal",
      headerShown: false,
    }}
  >
    <Stack.Screen name="CourseList" component={CoursesScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="Enroll" component={EnrollScreen} />
    <Stack.Screen name="Comments" component={CommentsScreen} />
  </Stack.Navigator>
);

export default CourseListNavigator;
