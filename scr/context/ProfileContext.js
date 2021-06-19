import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
import createFormData from "../helpers/createFormData";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "fetch-Profile":
      return { ...state, userProfile: action.payload };
    case "fetch-myProfile":
      return { ...state, myProfile: action.payload };
    case "reset-userProfile":
      return { ...state, userProfile: action.payload };
    case "reset-myProfile":
      return { ...state, myProfile: action.payload };
    case "arena":
      return { ...state, arenaProfiles: action.payload };
    default:
      return state;
  }
};

const updateProfileImage = (dispatch) => async (ResultObj) => {
  try {
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

const updateInfoUser = (dispatch) => async (name, about) => {
  try {
    await trackerApi.post("/profileInfoUpdate", { name, about });
    navigate("Account");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "error",
      payload: "someting went wrong with share",
    });
  }
};

const fetchProfile = (dispatch) => async (userID) => {
  const dispatchType =
    userID.userID == "myProfile" ? "fetch-myProfile" : "fetch-Profile";
  const response = await trackerApi.post("/profile/user", userID);
  dispatch({ type: dispatchType, payload: response.data });
};

const arena = (dispatch) => async () => {
  const response = await trackerApi.get("/arena");
  dispatch({ type: "arena", payload: response.data });
};

const resetUserProfile = (dispatch) => () => {
  dispatch({ type: "reset-userProfile", payload: [] });
};
const resetmyProfile = (dispatch) => () => {
  dispatch({ type: "reset-myProfile", payload: [] });
};
const followReq = (dispatch) => async (userID) => {
  try {
    await trackerApi.post("/follow", { userID });
  } catch (error) {
    console.log(error);
  }
};

const unfollowReq = (dispatch) => async (userID) => {
  try {
    await trackerApi.post("/unfollow", { userID });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  profileReducer,
  {
    followReq,
    unfollowReq,
    fetchProfile,
    updateProfileImage,
    updateInfoUser,
    resetUserProfile,
    resetmyProfile,
    arena,
  },
  { errorMessage: "", myProfile: [], userProfile: [], arenaProfiles: [] }
);
