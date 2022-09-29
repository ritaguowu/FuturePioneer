import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import Icon from "../components/Icon";
import EnrollListItem from "../components/EnrollListItem";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";
import userApi from "../api/users";

const menuItems = [
  {
    title: "My Courses",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "MyCourseList",
  },
  {
    title: "My Ratings",
    icon: {
      name: "credit-card-edit-outline",
      backgroundColor: colors.green,
    },
    targetScreen: "MyCommentsList",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.red,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: "Send Notification",
    icon: {
      name: "broadcast",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.SENDNOTIS,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [userImageUrl, setUserImageUrl] = useState();

  useEffect(() => {
    requestPermission();
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

  loadingUsers();
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        // console.log(result.uri);
        const response = await userApi.updateUserImage(result.uri, user.email);
        loadingUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };
  // console.log(userImageUrl);
  // const userIamgeString = () => {
  //   const s = "../assets/user" + user.userId + ".png";
  //   return s;
  // };

  return (
    <Screen style={styles.screen}>
      <View style={styles.cameraContainer}>
        <EnrollListItem
          title={user.name}
          subTitle={user.email}
          imageUrl={userImageUrl}
        />
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <MaterialCommunityIcons
            style={styles.iconPosition}
            name="camera"
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={colors.yellow} />}
        onPress={() => {
          Alert.alert(
            "Log Out",
            "Are you sure you want to log out your account?",
            [
              {
                text: "Yes",
                onPress: () => {
                  logOut();
                },
              },
              { text: "No" },
            ]
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flexDirection: "row",
  },
  container: {
    marginVertical: 20,
  },
  iconPosition: {
    justifyContent: "center",
    alignItems: "baseline",
    paddingTop: 15,
    paddingLeft: 120,
    color: colors.middlegrey,
  },
});

export default AccountScreen;
