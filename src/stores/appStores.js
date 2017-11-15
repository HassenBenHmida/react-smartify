import { tracksReducerHandler, formReducerHandler } from '../reducers';
import { createStore, combineReducers } from 'redux';

export const smartifyReducers = combineReducers({
  tracksReducerHandler,
  formReducerHandler
});

export function configureStore(initialState = { tracksReducerHandler: [], formReducerHandler: [] }) {
  //  const store = createStore(trackReducers, initialState);
  const store = createStore(smartifyReducers, initialState);
  return store;
}

export const smartifyStore = configureStore();

/**
 * import { formReducers } from '../reducers';
import { createStore } from 'redux';

export function configureStore(initialState = { formReducerHandler: [] }) {
  const store = createStore(formReducers, initialState);
  return store;
}

export const formStore = configureStore();
 */
