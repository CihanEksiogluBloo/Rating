import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, ListItem, BottomSheet } from "react-native-elements";

const ProfileActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [followed, setFollowed] = useState(false);

  const list = [
    {
      title: "UnFollow",
      onPress: () => {
        setFollowed(false);
        setIsVisible(false);
      },
    },
    { title: "Report" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View>
      {followed === false ? (
        <Button
          title={"Follow"}
          onPress={() => {
            setFollowed(true);
          }}
          containerStyle={{ minWidth: 150 }}
        />
      ) : (
        <Button
          title={"Following"}
          onPress={() => {
            setIsVisible(true);
          }}
          containerStyle={{ minWidth: 150 }}
        />
      )}

      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.4)" }}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileActionButton;
