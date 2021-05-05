import React,{useContext} from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';

const AccountScreen = () => {
    const {signout} = useContext(AuthContext);

    return <SafeAreaView forceInset={{top:'always'}}>
    

    </SafeAreaView>
}
AccountScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.push('Settings')}>
          <MaterialIcons name="admin-panel-settings" size={30} color="black" />
          </TouchableOpacity>
        ),
      };
};




const styles = StyleSheet.create({

})

export default AccountScreen;