import axios from "axios";
import jwt_decode from "jwt-decode";

// Own Imports
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

const getErrors = payload => ({
  type: GET_ERRORS,
  payload
});

export const startRegisterUser = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(response => {
        console.log("startRegisterUser then - In auth Action");
        console.log(response.data);

        return history.push("/login");
      })
      .catch(error => {
        // error.response.data contains error object sent from node API
        // this.setState(() => ({
        //   errors: error.response.data
        // }));
        console.log("startRegisterUser catch - In auth Action");
        console.log(error.response.data);

        dispatch(getErrors(error.response.data));
      });
  };
};

export const startLoginUser = userData => {
  return dispatch => {
    axios
      .post("/api/users/login", userData)
      .then(result => {
        console.log("startLoginUser then - In auth Action");
        console.log(result);

        const { token } = result.data;

        // Set token to ls
        localStorage.setItem("jwtToken", token);

        // Set token to Authorization header
        setAuthToken(token);

        // Decode token to get user data
        const decodedUserFromJwtToken = jwt_decode(token);

        // Set Current User
        dispatch(setCurrentUser(decodedUserFromJwtToken));
      })
      .catch(error => {
        // error.response.data contains error object sent from node API
        // this.setState(() => ({
        //   errors: error.response.data
        // }));
        console.log("startLoginUser catch - In auth Action");
        console.log(error.response.data);

        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const startLogOutUser = () => {
  return dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");

    // Remove auth header from future requests
    setAuthToken(false);

    // setIsAuthenticated to false and clear user info
    dispatch(setCurrentUser({}));
  };
};
