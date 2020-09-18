import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';

const initialState = {
  error: null,
  errorMsg: null,
  loading: false,
  questions: null,
  questionsUpdated: false,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTIONS_LOADING_START:
      return updateObject(state, {
        error: null,
        errorMsg: null,
        loading: true,
        questionsUpdated: false,
      });
    case actionTypes.SET_QUESTIONS:
      return updateObject(state, {
        questions: action.questions,
        error: null,
        errorMsg: null,
        loading: false,
      });
    case actionTypes.EDIT_QUESTIONS_SUCCESS:
      return updateObject(state, {
        questionsUpdated: true,
        error: null,
        errorMsg: null,
        loading: false,
      });
    case actionTypes.GET_QUESTIONS_FAILED:
    case actionTypes.EDIT_QUESTIONS_FAILED:
      return updateObject(state, {
        error: action.error,
        errorMsg: action.errorMsg,
        loading: false,
      });
    default:
      return state;
  }
};

export default questionsReducer;
