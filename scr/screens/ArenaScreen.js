import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList,useColorScheme  } from "react-native";
import { Text, Button } from "react-native-elements";
import { Context as ProfileContext } from "../context/ProfileContext";
import ProfileMiniCard from "../components/ProfileComps/ProfileMiniCard";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ArenaScreen = () => {
  const { arena, state } = useContext(ProfileContext);
  const colorScheme = useColorScheme();


  useEffect(() => {
    //LogBox.ignoreLogs([
    //  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    //]);
    arena();
  }, []);
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <FlatList
        data={state.arenaProfiles}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
            let colortext = "black"

            index+1 === 1 && colorScheme === 'light'
            ? colortext = "#4BAEA0"
            : index+1 === 2 && colorScheme === 'light'
            ? colortext = "#B6E6BD"
            : index+1 === 3 && colorScheme === 'light'
            ? colortext = "#F1F0CF"

            :index+1 === 1 && colorScheme !== 'light'
            ? colortext = "#A6B1E1"
            : index+1 === 2 && colorScheme  !== 'light'
            ? colortext = "#9EA9F099"
            : index+1 === 3 && colorScheme !== 'light'
            ? colortext = "#DCD6F7"
            : index+1 > 3 && colorScheme !== 'light'
            ? colortext = "#F4EEFF"

            : colortext = "#F1F0CF50"
          return (
            <View
              style={{ flexDirection: "row", flex: 20, alignItems: "center",backgroundColor:colortext }}
            >
              <View
                style={{
                  marginHorizontal: 10,
                  flex: 2,
                  alignItems: "center",
                  flexDirection: "row",
                  
                }}
              >
                <Text h3Style={styles.Texth3Style} h3>
                  {index + 1}
                </Text>
              </View>
              <View style={styles.ProfileMiniCardStyle}>
                <ProfileMiniCard
                  username={item.name}
                  nick_name={item.nick_name}
                  profile_image={item.profile_image}
                  star={item.user_rating}
                  userID={item._id}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaProvider>
  );
};
ArenaScreen.navigationOptions = ({ navigation }) => {
    return {
      title: "Highest Social Values",
      headerStyle:{
        backgroundColor:"#9BA4B4",
      },
      headerTitleStyle: {
        color:"white"
      },
      
    };
  };



const styles = StyleSheet.create({
    ProfileMiniCardStyle:{ flex: 19,paddingVertical:10 },
    Texth3Style : { textAlign: "center", flex: 1, },



});

export default ArenaScreen;
