import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from '../actions/actions'
import {
    combineReducers,
    createStore,
  } from 'redux';

function smartifyApp(state = {}, action) {
    //console.log(action)
    /* return state */
    switch (action.type) {
        case ADD_FAVORITE:
            //return state
            return [...state, action.store_track]
        case REMOVE_FAVORITE:
            let index = state.indexOf(action.store_track)
            console.log([
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ])
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
            /*let result = []
            let i = 0
            for (let object in state) {
                if(state[object] !== action.store_track){
                    result[i] = state[object]
                    i = i + 1
                }
            }
            return result*/
        default:
        return state
    }
}

export const reducers = combineReducers({  
    smartifyApp,
  });

export function configureStore(initialState = {smartifyApp:[]}) {  
    const store = createStore(
        reducers,
        initialState
    )
    return store;
};

export const store = configureStore();  

//export default smartifyApp