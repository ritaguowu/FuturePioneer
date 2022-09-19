import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/AccountScreen";
import MyCourseListScreen from "../screens/MyCourseListScreen";
import NewsScreen from "../screens/NewsScreen";
// import MessagesScreen from "../screens/MessagesScreen";

//Deprecated file
const Stack = createNativeStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="MyCourseList" component={MyCourseListScreen} />
    <Stack.Screen name="News" component={NewsScreen} />
    {/* <Stack.Screen name="Messages" component={MessagesScreen} /> */}
  </Stack.Navigator>
);

export default AccountNavigator;
