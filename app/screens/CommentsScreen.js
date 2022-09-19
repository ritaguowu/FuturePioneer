import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
// import { AppForm, AppFormField, AppFormPicker, SubmitButton} from "../components/forms/"
import Screen from "../components/Screen";
import LevelPickerItem from "../components/LevelPickerItem";
import AppDetailText from "../components/AppDetailText";
import FormImagePicker from "../components/forms/FormIamgePicker";
import { ScrollView } from "react-native-gesture-handler";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  description: Yup.string().min(3).label("Description"),
  image: Yup.array().max(3, "Maxium 3 photos please."),
});

const courses = [
  {
    id: 1,
    label: "Scratch",
    value: "1",
    backgroundColor: "yellow",
    icon: "book",
  },
  {
    id: 2,
    label: "Python",
    value: "2",
    backgroundColor: "green",
    icon: "book",
  },
  { id: 3, label: "Java", value: "3", backgroundColor: "red", icon: "book" },
];

const levels = [
  { label: "Level 1", value: 1, backgroundColor: "yellow", icon: "apps" },
  { label: "Level 2", value: 2, backgroundColor: "green", icon: "apps" },
  { label: "Level 3", value: 3, backgroundColor: "red", icon: "apps" },
  { label: "Level 4", value: 4, backgroundColor: "black", icon: "apps" },
];

function CommentsScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const userName = user.name;

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing.");
    }

    resetForm();
    // alert("Success");
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
        <AppDetailText style={styles.text}>
          How was your experience with us
        </AppDetailText>
        <AppForm
          initialValues={{
            course: null,
            description: "",
            level: null,
            images: [],
            userName: user.name,
            userId: user.userId,
          }}
          // onSubmit={(values) => console.log(location)}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormPicker
            items={courses}
            name="course"
            width="60%"
            placeholder="Course Name"
            PickerItemComponent={LevelPickerItem}
          />

          <AppFormPicker
            items={levels}
            name="level"
            placeholder="Level"
            width="50%"
            PickerItemComponent={LevelPickerItem}
          />

          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <FormImagePicker name="images" />
          <SubmitButton title="Post" />
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
export default CommentsScreen;
