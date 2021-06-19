import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, ListItem, BottomSheet } from "react-native-elements";

const ProfileActionButton = ({
  followReq,
  unfollowReq,
  userID,
  isFollowing,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [followed, setFollowed] = useState(isFollowing);

  const list = [
    {
      title: "UnFollow",
      onPress: () => {
        unfollowReq(userID);
        setFollowed(false);
        setIsVisible(false);
      },
    },
    {
      title: "Report",
      onPress: () => {
        setWhichlist(list2);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  const list2 = [
    {
      title: "Report",
      onPress: () => {
        setIsVisible(false);
        setWhichlist(list);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => {
        setIsVisible(false);
        setWhichlist(list);
      },
    },
  ];
  const [whichlist, setWhichlist] = useState(list);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 20,
      }}
    >
      {followed === false ? (
        <Button
          title={"Follow"}
          onPress={() => {
            setFollowed(true);
            followReq(userID);
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
      <Button
        title={"Report"}
        onPress={() => {
          setWhichlist(list2);
          setIsVisible(true);
        }}
        containerStyle={{ minWidth: 150 }}
      />

      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.4)" }}
      >
        {whichlist.map((l, i) => (
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
