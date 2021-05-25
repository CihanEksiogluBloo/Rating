import createDataContext from './createDataContext'
import trackerApi from '../api/tracker';
import createFormData from '../helpers/createFormData';
import {navigate} from '../navigationRef';



const postReducer = (state,action) => {
    switch(action.type) {
        case 'fetch_image':
            return action.payload
        case 'fetch_posts':
            return action.payload
        case 'create_post':
            return {...state,errorMessage:action.payload};
        case 'error':
            return {...state,errorMessage:action.payload};
        default:
            return state;
    }
};

const changeCategory = dispatch => (category) => {
    setcategoryState(category);
}

const createPost = dispatch => async  (explain,ResultObj,category) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
          }

          await trackerApi.post("/posts",createFormData(ResultObj,{ explain,category }),headers);
          navigate('TrackList');
        
    } catch (error) {
        console.log(error);
        dispatch({
            type:'error',
            payload:'someting went wrong with share'
    })
        
    }

};


const fetchPosts = dispatch => async () => {
    const response= await trackerApi.get('/discover');
    dispatch({type:'fetch_posts',payload:response.data});
    console.log(response)
}

const fetchPostsWithCategory = dispatch => async (category) => {
    const response= await trackerApi.get(`/discover/${category}`);
    dispatch({type:'fetch_posts',payload:response.data});
}

const fetchImage  = dispatch => async () => {
    try {
        //const response= await trackerApi.get(`/images/${dir}/:${name}`);
        const response= await trackerApi.get("/userposts");
        dispatch({type:'fetch_image',payload:response.data});
        

        
    } catch (error) {
        console.log(error);
        
    }

}

export const {Provider,Context} = createDataContext(
    postReducer,
    {createPost,fetchPosts,changeCategory,fetchImage,fetchPostsWithCategory},
    {errorMessage:'',defaultImage:"",defaultPP:""}
)