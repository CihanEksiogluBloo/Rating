import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef';
import createFormData from "../helpers/createFormData";


const authReducer = (state,action) => {
    switch (action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case "fetch-Profile" :
            return {...state,userProfile: action.payload};
        case 'signInorUp':
            return { errorMessage: "", token: action.payload };
        case 'clear_error' :
            return { ...state, errorMessage: "" };
        case 'signout':
            return { token: null, errorMessage: "" };
        case "fetch-myProfile" :
                return {...state,myProfile:action.payload};
        case "reset-userProfile":
            return{...state,userProfile:action.payload}
        default:
            return state;
    };
};

const tryLocalSignin = dispatch =>  () => {
    const token = AsyncStorage.getItem('token');
    
    if (token) {
        dispatch({type: 'signInorUp', payload: token});
        navigate('HomeSrc');
        
    } else {
        navigate('loginFlow');
    }
};
const updateProfileImage = (dispatch) => async (ResultObj) => {
    try {
        console.log(ResultObj)
      const headers = {
        "Content-Type": "multipart/form-data",
      };
  
      await trackerApi.post(
        "/profileImageUpdate",
        createFormData(ResultObj),
        headers
      );
      navigate("Account");
    } catch (error) {
      console.log(error);
      dispatch({
        type: "error",
        payload: "someting went wrong with share",
      });
    }
  };

const updateInfoUser = (dispatch) => async (name,about) => {
    try {
      await trackerApi.post("/profileInfoUpdate", { name,about });
      navigate("Account");
    } catch (error) {
      console.log(error);
      dispatch({
        type: "error",
        payload: "someting went wrong with share",
      });
    }
  };

const signup = dispatch => {
    return async ({email,password,nick_name}) => {
        // make api request to sign up with that email and password
        try {
            const response = await trackerApi.post('/signup',{email,password,nick_name})
        
            // if we sign up, modify our state, and say that we are authenticated
            
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({type:'signInorUp', payload: response.data.token});
           
            // navigate to mainflow

            navigate('HomeSrc');
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
            navigate("HomeSrc");
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
    
    const dispatchType = nick_name.nick_name == "myProfile" ? "fetch-myProfile" : "fetch-Profile"
    const response = await trackerApi.get(`/profile/${nick_name.nick_name}`);
    dispatch({type:dispatchType,payload:response.data});
    
};
const resetUserProfile = dispatch =>  () => {
    
    dispatch({type:"reset-userProfile",payload:[]});
    
};



export const {Provider,Context} = createDataContext(
    authReducer,
    {signup,signout,signin,clearErrorMessage,tryLocalSignin,fetchProfile,resetUserProfile,updateProfileImage,updateInfoUser},
    {token: null, errorMessage: '',myProfile:[],userProfile:[]}
);

