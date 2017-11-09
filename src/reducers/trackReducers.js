import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from '../actions'
import {
    combineReducers,
  } from 'redux';

function tracksReducerHandler(state = {}, action) {
    switch (action.type) {
        case ADD_FAVORITE:
            return [...state, action.track]
        case REMOVE_FAVORITE:
            let result = state
            return result.filter( (item) => item !== action.track)
        default:
        return state
    }
}

export const trackReducers = combineReducers({  
    tracksReducerHandler,
  });