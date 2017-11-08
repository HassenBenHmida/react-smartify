/*
 * action types
 */

//export const IN_FAVORITE = 'IN_FAVORITE'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

/*
 * action creators
 */

/* export function inFavorite(id) {
    return { type: IN_FAVORITE, id }
} */

export function addFavorite(store_track) {
    return { type: ADD_FAVORITE, store_track: store_track }
}

export function removeFavorite(store_track) {
    return { type: REMOVE_FAVORITE, store_track: store_track }
}