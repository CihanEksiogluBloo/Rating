import React from "react";
import { View, StyleSheet, Text,TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import SpacerCustom from "../Spacers/SpacerCustom";
import { getLocalhostUri } from "../../api/localhostUri";
import SocialValuePoint from "../evaluation/SocialValuePoint";
import { withNavigation } from "react-navigation";

const localhostUri = getLocalhostUri();

const ProfileMiniCard = ({ username, nick_name, profile_image, star,navigation,userID }) => {
  return (
    <SpacerCustom horizontal={20}>
    
    <TouchableOpacity onPress={()=> navigation.navigate("UserScrDiscover", { "data":userID }) } >
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{marginHorizontal:5}}>
            <Avatar
              rounded
              source={{
                uri: `${localhostUri}/ProfilePhoto/${profile_image}`,
              }}
              size="medium"
            />
          </View>
          <View>
            <Text style={styles.nickname}>@{nick_name}</Text>
            <Text style={styles.name}>{username}</Text>
          </View>
        </View>
        <View>
          <SocialValuePoint star={star} />
        </View>
      </View>
    </TouchableOpacity>
    </SpacerCustom>
  );
};

const styles = StyleSheet.create({
    container:{ flexDirection: "row", justifyContent: "space-between",marginTop:5,marginBottom:2,backgroundColor:"rgba(158, 150, 150, 0.55)",padding:10,borderRadius:20 },
    nickname:{color:"#0061a8",fontWeight:"600"},
    name:{color:"white"},


});

export default withNavigation(ProfileMiniCard);
