import { ActionReducerMap } from '@ngrx/store';

import * as fromFavorites from '../components/favorites/store/favorites.reducer';
import * as fromResults from '../components/home/search/store/search.reducer';
import * as fromWeekWeather from '../components/home/store/weekWeather/weekWeather.reducer';
import * as fromCurrCity from '../components/home/store/current/currCity.reducer';

export interface AppState {
    readonly favorites: fromFavorites.favoritesState,
    readonly stackResults: fromResults.resultsState,
    readonly weekWeather: fromWeekWeather.weekState,
    readonly currCity: fromCurrCity.currentCityState,
    readonly degreeType: fromWeekWeather.weekState
}

export const appReducer: ActionReducerMap<AppState> = {
    favorites: fromFavorites.favoritesReducer,
    stackResults: fromResults.resultsReducer,
    weekWeather: fromWeekWeather.weekReducer,
    currCity: fromCurrCity.currentCityReducer,
    degreeType: fromWeekWeather.weekReducer
};