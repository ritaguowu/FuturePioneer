import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import CommentCard from "../components/CommentCard";
import listingsApi from "../api/listings";
import AppDetailText from "../components/AppDetailText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import { COURSES, LEVELS } from "../utility/constants";
import userApi from "../api/users";

//Deprecated file
function CommentsListScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [usersList, setUsersList] = useState();

  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadingUsers();
    loadListings();
  }, []);

  const loadingUsers = async () => {
    const result = await userApi.getUsers();
    if (result.ok) {
      if (result.data) {
        setUsersList(result.data);
      }
    }
  };
  // const getListingsApi = useApi(listingsApi.getListings);

  // useEffect(()=>{
  //   getListingsApi.request();
  // }, []);

  return (
    <>
      {/* <Screen style={styles.screen}> */}
      {error && (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <AppDetailText>Couldn't retrieve the listings!</AppDetailText>
            <AppButton title="Retry" onPress={loadListings} />
          </View>
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        nestedScrollEnabled={true}
        data={listings}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item }) => (
          <CommentCard
            course={COURSES.filter((course) => course.id == item.courseId).map(
              (course) => course.name
            )}
            level={LEVELS.filter((level) => level.id == item.levelId).map(
              (level) => level.name
            )}
            description={item.description}
            imageUrl={item.images && item.images[0] && item.images[0].url}
            thumbanilUrl={
              item.images && item.images[0] && item.images[0].thumbanilUrl
            }
            userName={item.userName}
            userImageUrl={
              usersList.filter((u) => item.userId == u.id)[0].image.url
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadListings} />
        }
      ></FlatList>
      {/* </Screen> */}
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkwhite,
  },
});

export default CommentsListScreen;
