import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null
};
const reducer = (state = initialState, action) => {
  const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
  };

  const authSuccess = (state, action) => {
    return updateObject(state, {
      token: action.payload.token,
      userId: action.payload.userId,
      loading: false
    });
  };

  const authFailed = (state, action) => {
    return updateObject(state, {
      loading: false,
      error: action.payload.error
    });
  };

  const authLogout = (state, action) => {
    return updateObject(state, {
      token: null,
      userId: null
    });
  };
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
