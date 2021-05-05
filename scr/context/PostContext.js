import createDataContext from './createDataContext'
import trackerApi from '../api/tracker';

const postReducer = (state,action) => {
    switch(action.type) {
        case 'fetch_posts':
            return action.payload;
        case 'create_post':
            return {...state,errorMessage:action.payload}
        case 'error':
            return {...state,errorMessage:action.payload};
        default:
            return state;
    }
};


const createPost = dispatch => async  (explain,uri) => {
    try {
        console.log("create posttayız",explain,uri)
        //await trackerApi.post("/share",explain,result);   
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
}

export const {Provider,Context} = createDataContext(
    postReducer,
    {createPost,fetchPosts},
    {errorMessage:''}
)