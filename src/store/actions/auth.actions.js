import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId
    }
  };
};

const authFailed = err => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: {
      error: err
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkExpiration = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    try {
      dispatch(authStart());
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpaENQQo0btCYuJ4L6hVGbKStmxXaDYfs";
      if (!isSignup) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpaENQQo0btCYuJ4L6hVGbKStmxXaDYfs";
      }
      const result = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
      });
      const expirationDate = new Date(
        new Date().getTime() + result.data.expiresIn * 1000
      );
      localStorage.setItem("token", result.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", result.data.localId);

      dispatch(authSuccess(result.data.idToken, result.data.localId));
      dispatch(checkExpiration(result.data.expiresIn));
    } catch (err) {
      dispatch(authFailed(err.response.data.error));
    }
  };
};

export const checkAuthentication = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const userId = localStorage.getItem("userId");
      if (expirationDate > new Date()) {
        console.log("valid");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkExpiration(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    } else {
      dispatch(logout());
    }
  };
};
