import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signInorUp":
      return { errorMessage: "", token: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => () => {
  const token = AsyncStorage.getItem("token");
  //navigate("loginFlow");

  //This codes changed to comment strings for Github.
  if (token) {
    dispatch({ type: "signInorUp", payload: token });
    navigate("HomeSrc");
  } else {
    navigate("loginFlow");
  }
};

const signup = (dispatch) => {
  return async ({ email, password, nick_name }) => {
    // make api request to sign up with that email and password
    try {
      const response = await trackerApi.post("/signup", {
        email,
        password,
        nick_name,
      });

      // if we sign up, modify our state, and say that we are authenticated

      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signInorUp", payload: response.data.token });

      // navigate to mainflow

      navigate("HomeSrc");
    } catch (err) {
      // if signin up fails, we probably need to reflect an error message somewhere
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    // try to sign in
    try {
      const response = await trackerApi.post("/signin", { email, password });

      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signInorUp",
        payload: response.data.token,
      });
      // Handle success by updating state
      navigate("HomeSrc");
    } catch (error) {
      // Handle failure by showing error message(somehow)
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "clear_error",
  });
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signout,
    signin,
    clearErrorMessage,
    tryLocalSignin,
  },
  { token: null, errorMessage: "" }
);
