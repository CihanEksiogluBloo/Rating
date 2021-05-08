import React,{useContext,useState}  from 'react';
import {StyleSheet} from 'react-native';
import PhotoPicker from '../components/PhotoPicker';
import {Context as PostContext} from '../context/PostContext';
import {ButtonGroup } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';




const ShareScreen = () => {

    const {createPost,errorMessage} = useContext(PostContext);
    const buttons = ['Travel','Foods','Fun','Idea','LifeStyle','Art','Others'];
    const [state,setState] = useState(2);
    const [category,setCategory] = useState("Others");
    const { selectedIndex } = state
        

    const updateIndex = (selectedIndex) => {
            setState({selectedIndex});
            setCategory(buttons[selectedIndex]);
    }


    return (
        <SafeAreaProvider>
        <Spacer/>
        <ButtonGroup
                onPress={updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={styles.ButtonGroupStyle}
                vertical={false}
                textStyle={styles.ButtonGrouptextStyle}
            />
        
        <Spacer>
            <PhotoPicker
                onSubmit={createPost}
                category={category}
                errorMessage={errorMessage}
            />
        </Spacer>
        
            
            

            

            



         
        
        </SafeAreaProvider>
    )


}

const styles = StyleSheet.create({
    ButtonGroupStyle:{
        height:50,
        borderRadius:10,
    },
    ButtonGrouptextStyle:{
        fontSize:12,
        fontWeight:"bold"
        
    },
    buttonyle:{
        marginHorizontal:5
    
    }

});

export default ShareScreen