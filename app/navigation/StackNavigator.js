import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContext from "../auth/context";
import OfflineNotice from "../components/OfflineNotice";
import authStorage from "../auth/storage";

import WelcomeScreen from "../screens/WelcomeScreen";
import NewsScreen from "../screens/NewsScreen";
import CoursesScreen from "../screens/CoursesScreen";
import LoginScreen from "../screens/LoginScreen";
import UserNavigator from "./UserNavigator";
import CourseListNavigator from "./CourseListNavigator";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import AccountNavigator from "./AccountNavigator";
import EnrollScreen from "../screens/EnrollScreen";
import AccountScreen from "../screens/AccountScreen";
import LoginNavigator from "./LoginNavigator";
import RegisterScreen from "../screens/RegisterScreen";
import CourseContext from "../hooks/courseContext";
import MyCourseListScreen from "../screens/MyCourseListScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyCommentsListScreen from "../screens/MyCommentsListScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SendNotificationScreen from "../screens/SendNotificationScreen";
import CommentsListScreen from "../screens/CommentsListScreen";
import CommentsScreen from "../screens/CommentsScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState();
  const [courseName, setCourseName] = useState();
  // const [isReady, setIsReaday] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  useEffect(() => {
    restoreUser();
  }, []);

  // console.log("user:" + user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CourseContext.Provider value={{ courseName, setCourseName }}>
        <OfflineNotice />
        <Stack.Navigator
          screenOptions={{ headerShown: false, presentation: "modal" }}
        >
          {!user ? (
            <Stack.Group>
              {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
              <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Enroll" component={EnrollScreen} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="UserNavigator" component={UserNavigator} />
              <Stack.Screen
                name="AccountNavigator"
                component={AccountNavigator}
              />
              <Stack.Screen name="AccountScreen" component={AccountScreen} />
              <Stack.Screen name="Enroll" component={EnrollScreen} />
              <Stack.Screen
                name="MyCommentsList"
                component={MyCommentsListScreen}
              />
              <Stack.Screen
                name="MyCourseList"
                component={MyCourseListScreen}
              />
              <Stack.Screen
                name="SendNotification"
                component={SendNotificationScreen}
              />
            </Stack.Group>
          )}
          {/* Common modal screens */}
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="News" component={NewsScreen} />
            <Stack.Screen name="Course" component={CoursesScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} />
            <Stack.Screen name="CommentsList" component={CommentsListScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen
              name="CourseListNavigator"
              component={CourseListNavigator}
            />
            <Stack.Screen
              name="CourseDetailScreen"
              component={CourseDetailScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </CourseContext.Provider>
    </AuthContext.Provider>
  );
};

export default StackNavigator;
