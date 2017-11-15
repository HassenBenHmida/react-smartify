import { ADD_HISTORY } from '../types';

/*
 * action creators
 */

export function addHistory(history) {
  return { type: ADD_HISTORY, history: history };
}
