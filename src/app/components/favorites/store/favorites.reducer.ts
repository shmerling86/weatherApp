import * as FavoritesActions from './favorites.action';
import { Favorite } from 'src/app/interfaces/Favorite';

export type Action = FavoritesActions.All;

export interface favoritesState {
    favorites: Favorite[];
}

const defaultState: favoritesState = {
    favorites: []
}

export function favoritesReducer(
    state: favoritesState = defaultState,
    action: FavoritesActions.All
) {

    switch (action.type) {
        case FavoritesActions.ADD_FAVORITE:            
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        
        case FavoritesActions.REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((favorite) => {                    
                    return favorite.city.key != action.payload;
                })
            };
        default:
            return state;
    }
}