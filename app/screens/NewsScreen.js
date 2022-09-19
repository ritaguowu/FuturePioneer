import React from "react";
import {
  Pressable,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Alert,
} from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

import AppDetailText from "../components/AppDetailText";
import useAuth from "../auth/useAuth";

function NewsScreen({ navigation }) {
  const { user, logOut } = useAuth();

  // console.log(user, route.param?.name);
  // if (route.param?.name == "log out") {
  //   logOut();
  // }
  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <Image
            style={styles.image}
            source={require("../assets/news_background.jpg")}
          />
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>New Semester STARTS!</AppText>
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

          {/* Draw a line */}
          <View style={styles.hairline} />
          <AppText style={styles.text}>News</AppText>

          <View>
            <AppDetailText style={styles.paragraph}>
              1. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              2. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              3. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              4. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              5. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              6. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              7. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              8. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
            <AppDetailText style={styles.paragraph}>
              9. Sed ut perspiciatis unde omnis iste natus error sit
            </AppDetailText>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkwhite,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "20%",
    marginTop: "20%",
  },
  buttonContainer: {
    padding: 10,
    width: "100%",
  },
  hairline: {
    backgroundColor: colors.lightgrey,
    height: 2,
    width: "100%",
  },
  text: {
    alignItems: "flex-start",
    padding: 10,
    color: colors.black,
    fontWeight: "400",
    fontSize: 25,
    textAlign: "justify",
  },
  title: {
    alignContent: "center",
    color: colors.black,
    fontWeight: "400",
    fontSize: 20,
    justifyContent: "center",
  },
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 0,
    alignItems: "center",
  },
  paragraph: {
    margin: 14,
  },
  scrollView: {
    // height: "20%",
    width: "100%",
    margin: 10,
    alignSelf: "center",
    padding: 10,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
});

export default NewsScreen;
