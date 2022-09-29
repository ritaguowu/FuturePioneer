import React from "react";

import CourseListNavigator from "./CourseListNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NewsScreen from "../screens/NewsScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const user = () => {
//   const authContext = useContext(AuthContext);
//   // console.log(authContext.user);
//   return authContext.user;
// };

const Tab = createBottomTabNavigator();

const UserNavigator = () => {
  return (
    // const UserNavigator = () => {
    //   useNotificaitons();
    // return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        title: "",
        //   tabBarActiveBackgroundColor: "green",
        //   tabBarActiveTintColor: "white",
        //   tabBarInactiveBackgroundColor: "#eee",
        //   tabBarInactiveTintColor: "black",
      }}
    >
      {/* <Tab.Screen
      name="News"
      component={NewsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Course List"
      component={CourseListNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="CommentsList"
      component={CommentsListScreen}
      options={(navigation) => ({
        presentation: "modal",
        // tabBarButton: () => (
        //   <CommentsButton
        //     onPress={() => navigation.navigate(routes.COMMENTS_LIST)}
        //   />
        // ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book" color={color} size={size} />
        ),
      })}
    /> */}
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
            <MaterialIcons
              name="notifications-none"
              size={size}
              color={color}
            />
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
        name="My Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
        // options={{
        //   //size and color are automatically set by system suggestion
        //   tabBarIcon: ({ size, color }) => (
        //     <MaterialCommunityIcons name="home" size={size} color={color} />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};

export default UserNavigator;
