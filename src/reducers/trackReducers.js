import { ADD_FAVORITE, REMOVE_FAVORITE } from '../types';

function tracksReducerHandler(state = [], action) {
  let result = state;
  switch (action.type) {
    case ADD_FAVORITE:
      // return [...state, action.track];
      return state.concat([action.track]);
    case REMOVE_FAVORITE:
      return result.filter(item => item !== action.track);
    default:
      return state;
  }
}

export { tracksReducerHandler };
/* export const trackReducers = combineReducers({
  tracksReducerHandler
});
 */
