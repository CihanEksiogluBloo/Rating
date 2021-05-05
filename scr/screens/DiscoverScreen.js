//import '../_mockLocation'; // use only with emulator
import React,{useState} from 'react';
import {StyleSheet} from 'react-native';

import {Text,SearchBar} from 'react-native-elements';
import {SafeAreaView} from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';



const DiscoverScreen = () => {
    const [search,updateSearch] = useState("");

    return (
    <SafeAreaView  forceInset={{ top: 'always' }}>
    <Spacer>
    <SearchBar
        
        placeholder="Type Here..."
        onChangeText={(text)=> updateSearch(text)}
        value={search}
        
        containerStyle={styles.SearchBarContainer}
        inputContainerStyle={styles.SearchBarInput}
        inputStyle={{color:'rgb(123,104,238)'}}
        
        
        
      />
      </Spacer>
        <Text style={{fontSize:48}}> Discover Screen </Text>  
    
    
    </SafeAreaView>
    

    );
}



DiscoverScreen.navigationOptions = {
    title:'Discover',
    tabBarIcon: <MaterialIcons name="emoji-people" size={20} color="black" />
};

const styles = StyleSheet.create({
    SearchBarInput:{
        borderRadius:20,
        backgroundColor: 'rgba(158, 150, 150, 0.4)',
        borderBottomColor:'rgba(158, 150, 150, 1.0)',

        
    },
    SearchBarContainer:{
        backgroundColor:'rgba(0, 0, 0, 0.0)',
        borderColor: 'rgba(158, 150, 150, 0.0)',
        borderBottomColor:'rgba(158, 150, 150, 0.0)',
        borderTopColor:'rgba(158, 150, 150, 0.0)',



    }


})

export default DiscoverScreen;