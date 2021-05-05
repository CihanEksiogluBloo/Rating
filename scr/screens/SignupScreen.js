import React,{useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';

const SignupScreen = ({navigation}) => {

    const {state,signup,clearErrorMessage} = useContext(AuthContext);


    <NavigationEvents  
    onWillFocus={clearErrorMessage} 
    />

    


    

    return (
        <View style = {styles.container}>

        <AuthForm 
        headerText= "Sign Up For Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
        />

        <NavLink 
        text="Already have an account? Sign in instead."
        routeName="Signin"
        />



        
        </View>
     
     
     );
};

SignupScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };


const styles = StyleSheet.create({
    container: {
        flex:1,//View ekranın tamamını kaplaması için
        justifyContent: 'center',
        marginBottom: 250,
        

    },

        


    

});


export default SignupScreen;