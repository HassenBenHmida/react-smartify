import { ADD_HISTORY } from '../types';

function formReducerHandler(state = {}, action) {
  switch (action.type) {
    case ADD_HISTORY:
      return [...state, action.history];
    default:
      return state;
  }
}

export { formReducerHandler };
/* export const formReducers = combineReducers({
  formReducerHandler
}); */
