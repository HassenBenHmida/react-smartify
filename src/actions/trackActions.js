import { ADD_FAVORITE, REMOVE_FAVORITE } from '../types';

/*
 * action creators
 */

export function addFavorite(track) {
  return { type: ADD_FAVORITE, track: track };
}

export function removeFavorite(track) {
  return { type: REMOVE_FAVORITE, track: track };
}
