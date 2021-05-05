import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import {Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Spacer from './Spacer';
const ImagePickerComp = ({onSubmit}) => {


    const [image, setImage] = useState(null);
    
    const [input,setInput] = useState('');
    


    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        var result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        });

        console.log(result);


        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    return (
        <>
        <Input 
        label="input" 
        value={input} 
        onChangeText={(newinput)=> setInput(newinput)}
        />

        <Spacer/>
        
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image ? <View>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            <Button title="yazı" onPress={() => onSubmit(input,image)} />
            </View>
        
        : null}
        
        </>
    );
    }


export default ImagePickerComp;