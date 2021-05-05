import React,{useContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Context as TrackContext} from '../context/TrackContex';


const PostDetailScreen = ({navigation}) => {

    //const _id = navigation.getParam('_id');
    //const {state} = useContext(TrackContext);
    //const track = state.find( t => t._id === _id );



    return <>
        <Text style={{fontSize:48}}> 
            Track Detail
        </Text>
  
        </>
}
    

const styles = StyleSheet.create({


})

export default PostDetailScreen;