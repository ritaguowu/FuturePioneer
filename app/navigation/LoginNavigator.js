import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsScreen from "../screens/NewsScreen";
import RegisterNavigator from "../navigation/RegisterNavigator";
import MessagesScreen from "../screens/MessagesScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CourseListNavigator from "./CourseListNavigator";

const Tab = createBottomTabNavigator();
const LoginNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      title: "",
      lazy: true,
      //   tabBarActiveBackgroundColor: "green",
      //   tabBarActiveTintColor: "white",
      //   tabBarInactiveBackgroundColor: "#eee",
      //   tabBarInactiveTintColor: "black",
    }}
  >
    <Tab.Screen
      name="Home"
      component={NewsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
      // options={{
      //   //size and color are automatically set by system suggestion
      //   tabBarIcon: ({ size, color }) => (
      //     <MaterialCommunityIcons name="home" size={size} color={color} />
      //   ),
      // }}
    />

    <Tab.Screen
      name="Course List"
      component={CourseListNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="school" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notifications-none" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />

    <Tab.Screen
      name="Login"
      component={RegisterNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default LoginNavigator;
