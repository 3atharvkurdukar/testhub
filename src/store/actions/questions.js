import * as actionTypes from './actionTypes';
import { API } from 'aws-amplify';

const loadingStart = () => {
  return {
    type: actionTypes.QUESTIONS_LOADING_START,
  };
};

const actionFailed = (error, action) => {
  return {
    type: action,
    error,
    errorMsg: error.response ? error.response.data.message : null,
  };
};

const setQuestions = (questions) => {
  return {
    type: actionTypes.SET_QUESTIONS,
    questions,
  };
};

export const getQuestions = (subject) => {
  return (dispatch) => {
    dispatch(loadingStart());
    API.get('testhubAPI', '/questions/' + subject).then(
      (response) => {
        dispatch(setQuestions(response.questions));
      },
      (error) => {
        console.log(error);
        dispatch(actionFailed(error, actionTypes.GET_QUESTIONS_FAILED));
      }
    );
  };
};

const editQuestionsSuccess = () => {
  return {
    type: actionTypes.EDIT_QUESTIONS_SUCCESS,
  };
};

export const editQuestions = (subject, auth, questionsData) => {
  return (dispatch) => {
    dispatch(loadingStart());
    const data = {
      body: {
        questions: questionsData,
      },
      headers: {
        Authorization: auth,
      },
    };
    API.patch('testhubAPI', `/questions/${subject}`, data).then(
      (response) => {
        dispatch(editQuestionsSuccess());
        dispatch(setQuestions(response.questions));
      },
      (error) => {
        console.log(error);
        dispatch(actionFailed(error, actionTypes.EDIT_QUESTIONS_FAILED));
      }
    );
  };
};
