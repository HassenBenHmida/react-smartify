import { ADD_FAVORITE, REMOVE_FAVORITE } from '../types';

function tracksReducerHandler(state = [], action) {
  let result = state;
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.track];
    case REMOVE_FAVORITE:
      return result.filter(item => item.id !== action.track.id);
    default:
      return state;
  }
}

export { tracksReducerHandler };
