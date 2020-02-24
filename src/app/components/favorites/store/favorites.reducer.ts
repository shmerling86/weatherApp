import * as FavoritesActions from './favorites.actions';
import { Favorite } from 'src/app/interfaces/Favorite';
import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { HourlyWeather } from 'src/app/interfaces/HourlyWeather';

export type Action = FavoritesActions.All;

export interface favoritesState {
    favorites: Favorite[];
    isLoading: Boolean,
    degreeType: DegreeType,
    preview: HourlyWeather[],
    error: Error
}

const defaultState: favoritesState = {
    favorites: [],
    isLoading: false,
    degreeType: DegreeType.Celsius,
    preview: [],
    error: undefined
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
        case FavoritesActions.FAVORITE_PREVIEW:
            return {
                ...state,
                isLoading: true
            };
        case FavoritesActions.FAVORITE_PREVIEW_SUCCESS:
            return {
                ...state,
                preview: action.payload,
                isLoading: false
            };
        case FavoritesActions.FAVORITE_PREVIEW_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}