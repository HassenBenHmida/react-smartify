import { trackReducers } from '../reducers';
import { createStore } from 'redux';

export function configureStore(initialState = { tracksReducerHandler: [] }) {
  const store = createStore(trackReducers, initialState);
  return store;
}

export const trackStore = configureStore();
