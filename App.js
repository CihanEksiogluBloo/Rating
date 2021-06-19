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
import ArenaScreen from "./scr/screens/ArenaScreen";

import { Provider as AuthProvider } from "./scr/context/AuthContext";
import { Provider as PostProvider } from "./scr/context/PostContext";
import { Provider as ProfileProvider } from "./scr/context/ProfileContext";

import { setNavigator } from "./scr/navigationRef";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditProfile from "./scr/screens/EditProfile";



const HomeList = createStackNavigator({
  HomeSrc: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Rating",
      headerTitleStyle: { fontWeight: "bold", fontStyle: "italic",color:"white" },
    },
  },
  Share: ShareScreen,
  CommentsSrc: CommentsScreen,
  UserSrc:
  {
    screen: UserScreen,
    navigationOptions: {
    title: "User",
    },
  }, 
  PostDetailHome: {
    screen: PostDetailScreen,
    navigationOptions: {
      title: "Post Details",
    },
  },
  Arena : ArenaScreen,
});

HomeList.navigationOptions = {
  tabBarIcon: <FontAwesome5 name="home" size={20} color="white" />,
  
};

const Account = createStackNavigator({
  Account: AccountScreen,
  Settings: SettingsScreen,
  PostDetail: PostDetailScreen,
  EditSrc: EditProfile,
  AccountComments: CommentsScreen,
});

Account.navigationOptions = ({ navigation }) => {
  return {
    title: "Account",
    tabBarIcon: <MaterialIcons name="account-circle" size={20} color="white" />,
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <MaterialCommunityIcons
          name="settings-helper"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    ),
  };
};

const Discover = createStackNavigator({
  Discover: {
    screen: DiscoverScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PostDetailDiscover: {
    screen: PostDetailScreen,
    navigationOptions: {
      title: "Post",
    },
  },
  UserScrDiscover: {
    screen: UserScreen,
    navigationOptions: {
      title: "User Profile",
    },
    DiscoverComments: CommentsScreen,
  },
});

Discover.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: <MaterialIcons name="emoji-people" size={20} color="white" />,
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
    },{tabBarOptions:{inactiveBackgroundColor:"#9BA4B4",activeBackgroundColor:"#394867",labelStyle:{color:"white"}}}),
  },
  {}
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PostProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </PostProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};
