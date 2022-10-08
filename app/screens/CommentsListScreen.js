import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Icon, RefreshControl, FlatList, TouchableOpacity } from "react-native";
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
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import CommentContext from "../hooks/commentContext";


function CommentsListScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const {comments, setComments} = useContext(CommentContext);

  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(()=>listingsApi.getListings(setComments));

  // comments = useApi(listingsApi.getListings);

  useEffect(() => {
    loadingUsers();
    loadListings();
  },[]);


  // const loadListings = async () => {
  //   const result = await listingsApi.getListings();
  //   if (result.ok) {
  //     if (result.data) {
  //       setComments(result.data);
  //     }
  //   }
  // };

  const loadingUsers = async () => {
    const result = await userApi.getUsers();
    if (result.ok) {
      if (result.data) {
        setUsersList(result.data);
      }
    }
  };

  
  // useEffect(()=>{
  //   getListingsApi.request();
  // }, []);

  const onRefresh = React.useCallback(() => {
    loadingUsers();
    loadListings();
  });

  
  // console.log(listings);

  return (
    <>
      <Screen style={styles.screen}>
      {false && (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <AppDetailText>Couldn't retrieve the listings!</AppDetailText>
            <AppButton title="Retry" onPress={loadListings} />
          </View>
        </>
      )}
      {/* <ActivityIndicator visible={loading} /> */}
      <FlatList
        nestedScrollEnabled={true}
        data={comments}
        keyExtractor={(comments) => comments.id.toString()}
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
              usersList.filter((u) => item.userId == u.id)[0]?.image?.url
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></FlatList>
        <TouchableOpacity style={styles.comments_float_icon}
          onPress={() => {
            navigation.navigate("Comments");
          }}>
          <MaterialCommunityIcons name="comment-edit-outline" size={24} color="blue" />
        </TouchableOpacity>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkwhite,
  },
  comments_float_icon:{
    borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      position: 'absolute',
      bottom: 10,
      right: 10,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 100,
  }
});

export default CommentsListScreen;
