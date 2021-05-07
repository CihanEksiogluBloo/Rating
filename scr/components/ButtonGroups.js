import React,{useState,useContext}  from 'react';
import {StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';


const ButtonGroups = ({buttons}) => {
    
    const [state,setState] = useState(2);
    const [category,setCategory] = useState(null);
        

    const updateIndex = (selectedIndex) => {
            setState({selectedIndex});
            setCategory({selectedIndex});
            
    }

        
        
        const { selectedIndex } = state

    return (
        <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 350}}
            vertical={true}
    />
    )

}

const styles = StyleSheet.create({

});

export default ButtonGroups;