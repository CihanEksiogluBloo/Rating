import React,{useContext}  from 'react';
import {Text,View,StyleSheet} from 'react-native';
import PhotoPicker from '../components/PhotoPicker';
import {Context as PostContext} from '../context/PostContext';





const ShareScreen = () => {
    const {createPost} = useContext(PostContext);
 
    

    return (
        <View>
        <Text>Share Screen</Text>

            <PhotoPicker
            onSubmit={createPost}
            
            
            />


        
        
        </View>
    )


}

const styles = StyleSheet.create({

});

export default ShareScreen
