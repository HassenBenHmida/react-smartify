import { formReducers } from '../reducers';
import { createStore } from 'redux';

export function configureStore(initialState = { formReducerHandler: [] }) {
  const store = createStore(formReducers, initialState);
  return store;
}

export const formStore = configureStore();
