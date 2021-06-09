import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import createFormData from "../helpers/createFormData";
import { navigate } from "../navigationRef";

const postReducer = (state, action) => {
  switch (action.type) {
    case "fetch_image":
      return { ...state, post: action.payload };
    case "fetch_posts":
      return { ...state, post: action.payload };
    case "fetch_posts_onDiscover":
      return { ...state, discover: action.payload };
    case "create_post":
      return { ...state, errorMessage: action.payload };
    case "reset":
      return { ...state, post: [] };
    case "refresh_Discover":
      return { ...state, discover: [] };
    case "fetch_comments":
      return { ...state, comments: action.payload };
    case "error":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

const changeCategory = (dispatch) => (category) => {
  setcategoryState(category);
};

const createPost = (dispatch) => async (explain, ResultObj, category) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    await trackerApi.post(
      "/posts",
      createFormData(ResultObj, { explain, category }),
      headers
    );
    navigate("HomeSrc");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "error",
      payload: "someting went wrong with share",
    });
  }
};

const fetchPosts = (dispatch) => async () => {
  const response = await trackerApi.get("/discover");
  dispatch({ type: "fetch_posts_onDiscover", payload: response.data });
};

const resetPost = (dispatch) => () => {
  dispatch({ type: "reset", payload: null });
};
const resetDiscover = (dispatch) => () => {
    dispatch({ type: "refresh_Discover", payload: null });
  };

const fetchFollowedPosts = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/followed-posts");
    dispatch({ type: "fetch_image", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const fetchImage = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/userposts");
    dispatch({ type: "fetch_image", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const fetchPostComments = (dispatch) => async (postID) => {
  try {
    const response = await trackerApi.post("/comments", { postID });
    dispatch({ type: "fetch_comments", payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};

const ratePost = (dispatch) => async (userID, postID, star) => {
  try {
    await trackerApi.post("/rating-post", { userID, postID, star });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  postReducer,
  {
    createPost,
    fetchPosts,
    changeCategory,
    fetchImage,
    ratePost,
    fetchFollowedPosts,
    resetPost,
    fetchPostComments,
    resetDiscover
  },
  {
    errorMessage: "",
    defaultImage: "",
    defaultPP: "",
    post: [],
    discover: [],
    comments: [],
  }
);
