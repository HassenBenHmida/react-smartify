/*
 * action types
 */

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

/*
 * action creators
 */

export function addFavorite(track) {
    return { type: ADD_FAVORITE, track: track }
}

export function removeFavorite(track) {
    return { type: REMOVE_FAVORITE, track: track }
}