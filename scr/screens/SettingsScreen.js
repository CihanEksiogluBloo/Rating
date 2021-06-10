import React,{useContext} from 'react';
import {Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacers/Spacer';
import { Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from "react-native-safe-area-context";


const SettingsScreen = () => {
    const {signout} = useContext(AuthContext);

    return <>
    <Text style={{fontSize:48}}> Settings Screen </Text>
    <Spacer>
    <Button 
        title='Sign Out' 
        onPress={signout}
    
    />
    </Spacer>
    </>
}



const styles = StyleSheet.create({

})

export default SettingsScreen;