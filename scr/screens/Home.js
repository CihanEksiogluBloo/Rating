import React,{useContext} from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {




    return <>




    

    
    </>
}

HomeScreen.navigationOptions = ({navigation}) => {
  return{
    title:'Rating',
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Share')}>
      
        <FontAwesome name="plus" size={27} color="black" style={{marginHorizontal:10}} />
      </TouchableOpacity>
    )

  }
};




const styles = StyleSheet.create({

})

export default HomeScreen;