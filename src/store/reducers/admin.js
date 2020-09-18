import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';

const initialState = {
  adminData: null,
  auth: null,
  error: null,
  errorMsg: null,
  loading: false,
  loggedOut: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOADING_START:
      return updateObject(state, {
        error: null,
        errorMsg: null,
        loading: true,
        loggedOut: null,
      });
    case actionTypes.ADMIN_AUTH_SUCCESS:
      return updateObject(state, {
        adminData: action.adminData,
        auth: action.auth,
        error: null,
        errorMsg: null,
        loading: false,
        loggedOut: false,
      });
    case actionTypes.ADMIN_AUTH_LOGOUT:
      return updateObject(state, {
        adminData: null,
        auth: null,
        error: null,
        errorMsg: null,
        loading: null,
        loggedOut: true,
      });
    case actionTypes.ADMIN_SIGNUP_FAILED:
    case actionTypes.ADMIN_AUTH_FAILED:
    case actionTypes.ADMIN_LOGOUT_FAILED:
      return updateObject(state, {
        error: action.error,
        errorMsg: action.errorMsg,
        loading: false,
      });
    default:
      return state;
  }
};

export default adminReducer;
