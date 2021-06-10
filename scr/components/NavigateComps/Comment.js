import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { FontAwesome5 } from "@expo/vector-icons";

const Comment = ({ navigation, routeName, data }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
      onPress={() => navigation.navigate(routeName, { data })}
    >
      <FontAwesome5 name="comments" size={30} color="royalblue" />
      <Text style={styles.link}>Comments...</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "royalblue",
    marginLeft: 3,
  },
});

export default withNavigation(Comment);
