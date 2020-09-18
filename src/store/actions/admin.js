import * as actionTypes from './actionTypes';
import { API } from 'aws-amplify';

const loadingStart = () => {
  return {
    type: actionTypes.ADMIN_LOADING_START,
  };
};

const signupSuccess = () => {
  return {
    type: actionTypes.ADMIN_SIGNUP_SUCCESS,
  };
};

const signupFailed = (error) => {
  return {
    type: actionTypes.ADMIN_SIGNUP_FAILED,
    error,
    errorMsg: error.response ? error.response.data.message : null,
  };
};

const authSuccess = (adminData, auth) => {
  return {
    type: actionTypes.ADMIN_AUTH_SUCCESS,
    adminData,
    auth,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.ADMIN_AUTH_FAILED,
    error,
    errorMsg: error.response ? error.response.data.message : null,
  };
};

const loggedOut = () => {
  return {
    type: actionTypes.ADMIN_AUTH_LOGOUT,
  };
};

// const logoutFailed = (error) => {
//   return {
//     type: actionTypes.ADMIN_LOGOUT_FAILED,
//     error,
//     errorMsg: error.response ? error.response.data.message : null,
//   };
// };

export const signup = (username, password) => {
  return (dispatch) => {
    dispatch(loadingStart());
    const signupData = {
      body: {
        username,
        password,
      },
    };

    API.post('testhubAPI', '/admins', signupData).then(
      (response) => {
        dispatch(signupSuccess());
      },
      (error) => {
        console.log(error);
        dispatch(signupFailed(error));
      }
    );
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(loadingStart());
    const authData = {
      body: {
        username,
        password,
      },
    };

    API.post('testhubAPI', '/admins/login', authData).then(
      (response) => {
        localStorage.setItem('adminData', JSON.stringify(response.data));
        localStorage.setItem('auth', response.token);
        dispatch(authSuccess(response.data, response.token));
      },
      (error) => {
        console.log(error);
        dispatch(authFailed(error));
      }
    );
  };
};

export const logout = (auth) => {
  return (dispatch) => {
    dispatch(loadingStart());
    const data = {
      headers: {
        Authorization: auth,
      },
    };
    API.post('testhubAPI', '/admins/logout', data).then(
      (response) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('adminData');
        dispatch(loggedOut());
      },
      (error) => {
        console.log(error);
        dispatch(loggedOut());
        // dispatch(logoutFailed(error));
      }
    );
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    dispatch(loadingStart());
    const auth = localStorage.getItem('auth');
    if (!auth) {
      dispatch(loggedOut());
    } else {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      dispatch(authSuccess(adminData, auth));
    }
  };
};
