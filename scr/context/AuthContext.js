import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef';


const authReducer = (state,action) => {
    switch (action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case "fetch-Profile" :
            return action.payload;
        case 'signInorUp':
            return { errorMessage: "", token: action.payload };
        case 'clear_error' :
            return { ...state, errorMessage: "" };
        case 'signout':
            return { token: null, errorMessage: "" };
        default:
            return state;
    };
};

const tryLocalSignin = dispatch =>  () => {
    const token = AsyncStorage.getItem('token');
    
    if (token) {
        dispatch({type: 'signInorUp', payload: token});
        navigate('TrackList');
        
    } else {
        navigate('loginFlow');
    }
};



const signup = dispatch => {
    return async ({email,password}) => {
        // make api request to sign up with that email and password
        try {
            const response = await trackerApi.post('/signup',{email,password})
        
            // if we sign up, modify our state, and say that we are authenticated
            
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({type:'signInorUp', payload: response.data.token});
           
            // navigate to mainflow

            navigate('TrackList');
        }
        catch(err){
            // if signin up fails, we probably need to reflect an error message somewhere
            dispatch({type:'add_error',payload:'Something went wrong with sign up'})

        }

        

        



    };
};

const signin = dispatch => async  ({email,password}) => {
        // try to sign in
        try {
            const response = await trackerApi.post("/signin",{email,password})

            await AsyncStorage.setItem("token",response.data.token)
            dispatch({
                type:"signInorUp",
                payload:response.data.token
            })
            // Handle success by updating state
            navigate("TrackList");
        } catch (error) {
            // Handle failure by showing error message(somehow)
            console.log(error);
            dispatch({
                type:'add_error',
                payload : 'Something went wrong with sign in'
            })
            
        }


        
    }

    const clearErrorMessage = dispatch => () => {
        dispatch({
          type: "clear_error",
        });
      };



const signout = dispatch => async () => {
    // try to sign out
    await AsyncStorage.removeItem('token');
    dispatch({type:'signout'})
    navigate('loginFlow')
}

const fetchProfile = dispatch => async  (nick_name) => {
    const response = await trackerApi.get(`/profile/${nick_name}`);
    dispatch({type:"fetch-Profile",payload:response.data});
    
};



export const {Provider,Context} = createDataContext(
    authReducer,
    {signup,signout,signin,clearErrorMessage,tryLocalSignin,fetchProfile},
    {token: null, errorMessage: ''}
);

