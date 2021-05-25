import React,{useContext,useEffect} from 'react';
import {StyleSheet,TouchableOpacity,FlatList,View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PostView from '../components/PostView';
import {getLocalhostUri} from '../api/localhostUri';
import {Context as PostContext} from '../context/PostContext';
import {NavigationEvents} from 'react-navigation';

const HomeScreen = () => {
    const localhostUri = getLocalhostUri();
    const {state,fetchImage} = useContext(PostContext);
    
    useEffect(()=>{
      fetchImage();
  },[])

    return <>
    <NavigationEvents onWillBlur={fetchImage} />

    <FlatList 
    data={state}
    keyExtractor={(item) => item._id}
    renderItem={( {item} ) => {
        
      return ( <View>
        <PostView
        localhostUri={localhostUri}
        item={item}
        />
        </View>
    
      );
    }}
    />

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