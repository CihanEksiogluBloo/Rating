import React from "react";

import {
  createAppContainer,
  createSwitchNavigator,
  TouchableOpacity,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AccountScreen from "./scr/screens/AccountScreen";
import SignupScreen from "./scr/screens/SignupScreen";
import SigninScreen from "./scr/screens/SigninScreen";
import DiscoverScreen from "./scr/screens/DiscoverScreen";
import PostDetailScreen from "./scr/screens/PostDetailScreen";
import HomeScreen from "./scr/screens/Home";
import ResolveAuthScreen from "./scr/screens/ResolveAuthScreen";
import SettingsScreen from "./scr/screens/SettingsScreen";
import ShareScreen from "./scr/screens/ShareScreen";
import UserScreen from "./scr/screens/UserScreen";
import CommentsScreen from "./scr/screens/CommentsScreen";

import { Provider as AuthProvider } from "./scr/context/AuthContext";
import { Provider as PostProvider } from "./scr/context/PostContext";

import { setNavigator } from "./scr/navigationRef";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';

const HomeList = createStackNavigator({
  HomeSrc: {screen:HomeScreen,navigationOptions:{
    title:"Rating",
    headerTitleStyle:{fontWeight: "bold", fontStyle:"italic"}
  }},
  Share: ShareScreen,
  CommentsSrc: CommentsScreen,
  UserSrc: UserScreen,
});

HomeList.navigationOptions = {
  tabBarIcon: <FontAwesome5 name="home" size={20} color="black" />,
};

const Account = createStackNavigator({
  Account: AccountScreen,
  Settings: SettingsScreen,
  PostDetail: PostDetailScreen,
});

Account.navigationOptions = ({ navigation }) => {
  return {
    title: "Account",
    tabBarIcon: <MaterialIcons name="account-circle" size={20} color="black" />,
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <MaterialCommunityIcons
          name="settings-helper"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    ),
  };
};

const Discover = createStackNavigator({
  Discover: {
    screen:DiscoverScreen,
    navigationOptions:{
      headerShown:false
    }
  },
  PostDetailDiscover: {
    screen:PostDetailScreen,
    navigationOptions:{
      title:"Post"
    }
    
  },
},


);

Discover.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: <MaterialIcons name="emoji-people" size={20} color="black" />,

  };
};

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen,
    }),
    mainFlow: createBottomTabNavigator({
      Home: HomeList,
      Discover: Discover,
      Account: Account,
    }),
    
  },
  {}
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <PostProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </PostProvider>
    </AuthProvider>
  );
};
