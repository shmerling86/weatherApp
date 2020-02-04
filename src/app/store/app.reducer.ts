import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromFavorites from '../components/favorites/store/favorites.reducer';
import * as fromResults from '../components/home/search/store/search.reducer';
import * as fromWeekWeather from '../components/home/store/weekWeather/weekWeather.reducer';
import * as fromCurrCity from '../components/home/store/current/currCity.reducer';
import * as fromCurrCityByPosition from '../components/home/store/currentByPosition/currentByPosition.reducer';


export interface AppState {
    readonly router: RouterReducerState,
    readonly favorites: fromFavorites.favoritesState,
    readonly stackResults: fromResults.resultsState,
    readonly weekWeather: fromWeekWeather.weekState,
    readonly currCity: fromCurrCity.currentCityState,
    readonly currCityByPosition: fromCurrCityByPosition.currentCityByPositionState,
    readonly degreeType: fromWeekWeather.weekState
};

export const appReducer: ActionReducerMap<AppState> = {
    router: routerReducer,
    favorites: fromFavorites.favoritesReducer,
    stackResults: fromResults.resultsReducer,
    currCity: fromCurrCity.currentCityReducer,
    currCityByPosition: fromCurrCityByPosition.currentCityReducer,
    weekWeather: fromWeekWeather.weekReducer,
    degreeType: fromWeekWeather.weekReducer
};