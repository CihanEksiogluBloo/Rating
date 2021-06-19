import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";

const buttons = [
  "Travel",
  "Foods",
  "Fun",
  "Idea",
  "LifeStyle",
  "Art",
  "Others",
];

const CatButtonGroup = ({ press }) => {
  const [category, setCategory] = useState("Others");

  const updateIndex = (category) => {
    setCategory(category);
    press([]);
  };

  return (
    <ButtonGroup
      onPress={updateIndex}
      selectedIndex={category}
      buttons={buttons}
      containerStyle={styles.ButtonGroupStyle}
      vertical={false}
      textStyle={styles.ButtonGrouptextStyle}
    />
  );
};

const styles = StyleSheet.create({
  ButtonGroupStyle: {
    height: 50,
    borderRadius: 10,
  },
  ButtonGrouptextStyle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CatButtonGroup;
