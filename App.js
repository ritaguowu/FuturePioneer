import React, { useState, useEffect, useNetInfo } from "react";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, Image, View } from "react-native";

// import Screen from "./app/components/Screen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { Button } from "react-native";

// import UserNavigator from "./app/navigation/UserNavigator";
// import VisitorNavigator from "./app/navigation/VisitorNavigator";
// import NetInfo from "@react-native-community/netinfo";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import StackNavigator from "./app/navigation/StackNavigator";
import { Notification } from "expo-notifications";

// const categories = [
//   {label: "Programming", value:1},
//   {label: "Basic Class", value:2},
//   {label: "Finance", value:3},
// ]

// const Link = () => {
//   const navigation = useNavigation();
//   return (
//     <Button
//       title="View Tweet"
//       onPress={() => navigation.navigate("TweetDetails", { id: 1 })}
//     />
//   );
// };

// const Tweets = ({ navigation }) => (
//   <Screen>
//     <Text>Tweets</Text>
//     {/* <Button
//     title='View Tweet'
//     onPress={()=>navigation.navigate("TweetDetails")}
//     /> */}
//     <Link />
//   </Screen>
// );
// const TweetDetails = ({ route }) => (
//   <Screen>
//     <Text>TweetDetails {route.params.id}</Text>
//   </Screen>
// );

// const Stack = createNativeStackNavigator();
// const StatckNavigator = () => (
//   <Stack.Navigator
//     //global setting
//     screenOptions={{
//       headerStyle: { backgroundColor: "dodgerblue" },
//       headerTintColor: "white",
//     }}
//   >
//     <Stack.Screen
//       name="Tweets"
//       component={Tweets}
//       //specific setting for single screen
//       // options={{
//       //   headerStyle: {backgroundColor: "green"},
//       //   headerTintColor: "white",
//       //   // headerShown: false
//       // }}
//     />
//     <Stack.Screen
//       name="TweetDetails"
//       component={TweetDetails}
//       // options={{title: "Tweet D"}}
//       options={({ route }) => ({ title: JSON.stringify(route.params.id) })}
//     />
//   </Stack.Navigator>
// );

// const Account = () => (
//   <Screen>
//     <Text>Account</Text>
//   </Screen>
// );

// export default function App() {
//   // const [category, setCategory] = useState(categories[0]);
//   return (
//     // <Screen>
//     //   <AppPicker
//     //   selectedItem={category}
//     //   onSelectItem={item => setCategory(item)}
//     //   items={categories} icon="apps" placeholder="Category"/>
//     //   <AppTextInput icon="email" placeholder="Email"/>
//     // </Screen>
//     // <NewsScreen/>
//     // <LoginScreen/>
//     // <RegisterScreen/>
//     // <ListingEditScreen/>
//     // <CoursesScreen/>
//     // <AccountScreen/>

//     // <NavigationContainer theme={navigationTheme}>
//     <NavigationContainer>
//       {/* <StatckNavigator /> */}
//       <UserNavigator />
//       {/* <VisitorNavigator/> */}
//       {/* <TabNavigator /> */}
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import authStorage from "./app/auth/storage";
// import { AppLoading } from "expo";
// import NewsScreen from "./app/screens/NewsScreen";
// import CoursesScreen from "./app/screens/CoursesScreen";

import { navigationRef } from "./app/navigation/rootNavigation";
// import useNotificaitons from "./app/hooks/useNotificaitons";
// import CommentsListScreen from "./app/screens/CommentsListScreen";

// const Stack = createNativeStackNavigator();

export default function App() {
  // const [user, setUser] = useState();
  // // const [isReady, setIsReaday] = useState(false);

  // const restoreUser = async () => {
  //   const user = await authStorage.getUser();
  //   if (user) setUser(user);
  // };
  // useEffect(() => {
  //   restoreUser();
  // });

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReaday(true)}
  //       onError={(err) => console.log(err)}
  //     />
  //   );

  // Notificaiton;
  // const schedulePushNotification = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: "Here is the notification body",
  //       data: { data: "goes here" },
  //     },
  //     trigger: { seconds: 2 },
  //   });
  // };
  return (
    // <Screen>
    //   <Button title="tap me" onPress={schedulePushNotification} />
    // </Screen>

    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
      {/* {!user ? <VisitorNavigator /> : <UserNavigator />} */}
    </NavigationContainer>
  );
}
