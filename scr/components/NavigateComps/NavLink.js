import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName, data }) => {
  const checkdata = data || null;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName, { data: checkdata })}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "royalblue",
  },
});

export default withNavigation(NavLink);
