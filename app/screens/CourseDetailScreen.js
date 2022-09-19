import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import AppImage from "../components/AppImage";
import colors from "../config/colors";
import AppDetailText from "../components/AppDetailText";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import EnrollListItem from "../components/EnrollListItem";
import userApi from "../api/users";
import enrollApi from "../api/enrolls";
import { GRADES } from "../utility/constants";
import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import ActivityIndicator from "../components/ActivityIndicator";
import CommentCard from "../components/CommentCard";
import { COURSES, LEVELS } from "../utility/constants";

function CourseDetailScreen({ route, navigation }) {
  const { user } = useAuth();
  const rating = user ? "Rating" : "";
  const list = route.params;
  const title = "2022 Spring " + list.title + " Programming START!";

  const [enrollsList, setEnrollsList] = useState();
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    loadingUsers();
    loadingEnrolls();
    loadListings();
  }, []);

  const loadingUsers = async () => {
    const response = await userApi.getUsers();
    if (response.ok) {
      if (response.data) {
        const userList = response.data;
        setUsersList(userList);
      }
    }
  };

  const loadingEnrolls = async () => {
    const result = await enrollApi.getEnrolls();
    if (result.ok) {
      if (result.data) {
        const enrollsList = result.data.filter(
          (enroll) => list.id == enroll.courseId
        );
        setEnrollsList(enrollsList);
      }
    }
  };
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  // console.log(usersList);

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView horizontal={false}>
          <View style={styles.textContainer}>
            <AppText style={styles.text}>{list.title}</AppText>
          </View>

          <AppDetailText style={styles.detailContainer}>
            {list.detail}
          </AppDetailText>

          <AppImage title={title} image={list.image}></AppImage>

          {/* <TouchableOpacity onPress={() => navigation.push("Comments")}>
            <View style={styles.ratingContainer}>
              <AppDetailText style={styles.ratingText}>{rating}</AppDetailText>
            </View>
          </TouchableOpacity> */}

          <View style={styles.enroll_list}>
            {enrollsList && (
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                style={styles.userContainer}
                data={enrollsList}
                keyExtractor={(enrollsList) => enrollsList.id.toString()}
                renderItem={({ item, index }) => (
                  <EnrollListItem
                    title={enrollsList[index].kidName}
                    subTitle={GRADES.filter(
                      (grade) => grade.id == item.gradeId
                    ).map((grade) => grade.name)}
                    imageUrl={
                      usersList.filter(
                        (u) => enrollsList[index].userId == u.id
                      )[0].image.url
                    }
                  />
                )}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            {user && (
              <AppButton
                title="ENROLL"
                color="secondary"
                onPress={() => navigation.push("Enroll")}
              />
            )}
            {!user && (
              <AppButton
                title="ENROLL"
                color="secondary"
                style={{ color: colors.lightgrey }}
                onPress={() => {
                  Alert.alert(
                    "Alert!",
                    "Please login first!",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  );
                }}
              />
            )}
          </View>
          <View style={styles.comments_list}>
            <AppDetailText style={styles.feedback_text}>
              Student feedback
            </AppDetailText>
            <ScrollView horizontal={true}>
              <View>
                {error && (
                  <>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <AppDetailText>
                        Couldn't retrieve the listings!
                      </AppDetailText>
                      <AppButton title="Retry" onPress={loadListings} />
                    </View>
                  </>
                )}
                <ActivityIndicator visible={loading} />

                <FlatList
                  horizontal={false}
                  scrollEnabled={false}
                  data={listings}
                  keyExtractor={(listings) => listings.id.toString()}
                  renderItem={({ item }) => (
                    <CommentCard
                      course={COURSES.filter(
                        (course) => course.id == item.courseId
                      ).map((course) => course.name)}
                      level={LEVELS.filter(
                        (level) => level.id == item.levelId
                      ).map((level) => level.name)}
                      description={item.description}
                      imageUrl={
                        item.images && item.images[0] && item.images[0].url
                      }
                      thumbanilUrl={
                        item.images &&
                        item.images[0] &&
                        item.images[0].thumbanilUrl
                      }
                      userName={
                        usersList.filter((u) => item.userId == u.id)[0].name
                        // item.userName
                      }
                      userImageUrl={
                        usersList.filter((u) => item.userId == u.id)[0].image
                          .url
                      }
                    />
                  )}
                ></FlatList>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.darkwhite,
    overflow: "hidden",
    flex: 1,
  },

  buttonContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  detailContainer: {
    padding: 20,
    marginBottom: 7,
    lineHeight: 23,
    textAlign: "justify",
  },
  ratingContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  ratingText: {
    color: colors.blue,
    alignContent: "flex-end",
    paddingRight: 16,
  },
  text: {
    color: colors.darkblack,
    fontWeight: "500",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    marginVertical: 20,
    paddingright: 0,
  },
  feedback_text: {
    paddingTop: -15,
    paddingLeft: 15,
    color: colors.darkblack,
    fontWeight: "500",
  },
  enroll_list: {
    width: "100%",
    height: 120,
    paddingTop: 20,
  },
  comments_list: {
    width: "100%",
  },
});

export default CourseDetailScreen;
