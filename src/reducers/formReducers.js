import { ADD_HISTORY } from '../types';
import { combineReducers } from 'redux';

function formReducerHandler(state = {}, action) {
  switch (action.type) {
    case ADD_HISTORY:
      return [...state, action.history];
    default:
      return state;
  }
}

export const formReducers = combineReducers({
  formReducerHandler
});
