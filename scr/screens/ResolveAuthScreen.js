import React, { useEffect,useContext } from 'react';
import {Context as AuthContext} from '../context/AuthContext';



const ResolveAuthScreen = () => {
  const { state, signup, clearErrorMessage, tryLocalSignin } 
  = useContext(AuthContext);

    useEffect(()=> {
      tryLocalSignin();
      
        
  
      }, []);


    return null;
};

export default ResolveAuthScreen;

