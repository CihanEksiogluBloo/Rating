import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef';
import createFormData from "../helpers/createFormData";


const profileReducer = (state,action) => {
    switch (action.type){
        default:
            return state;
    };
};

/*
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



const fetchProfile = dispatch => async  (nick_name) => {
    
    const dispatchType = nick_name.nick_name == "myProfile" ? "fetch-myProfile" : "fetch-Profile"
    const response = await trackerApi.get(`/profile/${nick_name.nick_name}`);
    dispatch({type:dispatchType,payload:response.data});
    
};

const resetUserProfile = dispatch =>  () => {
    
    dispatch({type:"reset-userProfile",payload:[]});
    
};
*/
const followReq = dispatch => async  (userID) => {
    try {
        await trackerApi.post("/follow", { userID });
    } catch (error) {
        console.log(error)
        
    }
    
};
const unfollowReq = dispatch => async  (userID) => {
    try {
        await trackerApi.post("/unfollow", { userID });
    } catch (error) {
        console.log(error)
        
    }
    
};


export const {Provider,Context} = createDataContext(
    profileReducer,
    {followReq,unfollowReq},
    {errorMessage: '',myProfile:[],userProfile:[]}
);

