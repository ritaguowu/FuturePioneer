import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import { ErrorMessage } from "../components/forms";
import AppForm from "../components/forms/AppForm";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
// import { AppForm, AppFormField, AppFormPicker, SubmitButton} from "../components/forms/"
import Screen from "../components/Screen";
import LevelPickerItem from "../components/LevelPickerItem";
import AppDetailText from "../components/AppDetailText";
import FormImagePicker from "../components/forms/FormIamgePicker";
import enrollsApi from "../api/enrolls";

import useLocation from "../hooks/useLocation";
import EnrollListItem from "../components/EnrollListItem";
import {
  COURSES,
  LEVELS,
  SCRATCH_PRICE,
  PYTHON_PRICE,
  JAVA_PRICE,
  GRADES,
} from "../utility/constants";
import useCourse from "../hooks/useCourse";
import userApi from "../api/users";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  level: Yup.object().required().nullable().label("Level"),
});

function EnrollScreen({ route, navigation }) {
  const { user } = useAuth();
  const { courseName } = useCourse();
  const [userImageUrl, setUserImageUrl] = useState([]);
  const [price, setPrice] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const userId = user.userId;
  const [error, setError] = useState();

  // console.log(userId);

  useEffect(() => {
    // console.log("userImage:" + user.image);
    setPrice(
      courseName == "Scratch"
        ? SCRATCH_PRICE
        : courseName == "Python"
        ? PYTHON_PRICE
        : JAVA_PRICE
    );
  }, [courseName]);

  console.log(user.userId, user.email);
  useEffect(() => {
    loadingUsers();
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
    // console.log(response.data);
  };

  const handleSubmit = async (enroll, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await enrollsApi.addEnroll(
      { ...enroll },
      userImageUrl,
      price,
      (progress) => setProgress(progress)
    );

    resetForm();

    if (!result.ok) {
      if (result.data) {
        setError(result.data.error);
        setUploadVisible(false);
        return alert("Could not save the enroll.");
      } else {
        setError("An unexpected error occurred.");
        // console.log(result);
      }
    }

    // alert("Success");
  };

  // console.log(userImageUrl);
  // const image = () => {
  //   const imageLastSlashIndex = userImageUrl.lastIndexOf("/");
  //   const imageLastPointIndex = userImageUrl.lastIndexOf(".");
  //   return (
  //     userImageUrl.toString().substring(imageLastSlashIndex + 1),
  //     imageLastPointIndex
  //   );
  // };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
        <AppForm
          initialValues={{
            coursename: courseName,
            level: null,
            userId: userId,
            subTitle: user.email,
            imageUrl: userImageUrl,
            price: price,
          }}
          onSubmit={handleSubmit}
        >
          <ErrorMessage error={error} visible={error} />
          <EnrollListItem
            title={user.name}
            subTitle={user.email}
            // weChat="3 Grade"
            imageUrl={userImageUrl}
            // image={require("../assets/user1.png")}
          />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Student Name"
          />

          <AppFormField
            autoCorrect={false}
            icon="phone"
            name="phone"
            placeholder="Phone Number"
          />
          <AppFormPicker
            items={GRADES}
            name="grade"
            width="60%"
            placeholder="Student Grade"
            PickerItemComponent={LevelPickerItem}
          />

          <AppFormPicker
            items={COURSES}
            name="course"
            width="60%"
            placeholder="Course Name"
            PickerItemComponent={LevelPickerItem}
          />
          <AppFormPicker
            items={LEVELS}
            name="level"
            placeholder="Level"
            width="50%"
            PickerItemComponent={LevelPickerItem}
          />

          <AppDetailText style={{ padding: 15 }} name="price">
            Price: $ {price}
          </AppDetailText>
          <SubmitButton title="Enroll" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 30,
  },
});
export default EnrollScreen;
