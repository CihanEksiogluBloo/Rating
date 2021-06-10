import React,{useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text,Button,Input} from 'react-native-elements';
import Spacer from './Spacers/Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return (
        <>
        <Spacer>

        <Spacer/>
        <Text h3>{headerText}</Text>
        </Spacer>

        <Input 
        label="Email" 
        value={email} 
        onChangeText={(newEmail)=> setEmail(newEmail)}
        autoCapitalize= "none"
        autoCorrect= {false}
        />

        <Spacer/>

        <Input 
        secureTextEntry={true}
        label="Password" 
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)} 
        autoCapitalize= "none"
        autoCorrect= {false}
        />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        
        
        <Spacer>
            <Button title={submitButtonText} onPress={() => onSubmit({email,password})} />
        </Spacer>
        </>
    );
    
};

const styles =  StyleSheet.create({
    errorMessage:{
        fontSize:16,
        color: 'red',
        alignSelf: 'center',
    },

})


export default AuthForm;