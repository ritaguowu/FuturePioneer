import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal } from "react-native";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppDetailText from "../components/AppDetailText";
import PickerItem from "../components/PickerItem";
import useCourse from "../hooks/useCourse";

function AppPicker({
  selectedItem,
  onSelectItem,
  items,
  icon,
  placeholder,
  width = "100%",
  PickerItemComponent = PickerItem,
}) {
  const { courseName, newCourse } = useCourse("");
  const [modalVisible, setModalVisible] = useState(false);
  const courseChoosed = () => {
    if (
      selectedItem?.name == "Scratch" ||
      selectedItem?.name == "Python" ||
      selectedItem?.name == "Java"
    )
      newCourse(selectedItem.name.toString());
  };

  // console.log("courseChoosed:" + courseChoosed());

  useEffect(() => {
    courseChoosed();
  }, [selectedItem]);

  console.log(selectedItem?.label);

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.darkblack}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppDetailText style={styles.text}>
              {selectedItem.label}
            </AppDetailText>
          ) : (
            <AppDetailText style={styles.placeholder}>
              {placeholder}
            </AppDetailText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.darkblack}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.middlegrey,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});
export default AppPicker;
