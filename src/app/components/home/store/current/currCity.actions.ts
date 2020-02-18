import { Action } from '@ngrx/store';
import { CityKeys } from 'src/app/interfaces/CityKeys';
import { CityWeather } from 'src/app/interfaces/CityWeather';


export const CURRENT_CITY = '[CITY] CURRENT_CITY';
export const CURRENT_CITY_SUCCESS = '[CITY] CURRENT_CITY_SUCCESS';
export const CURRENT_CITY_FAILURE = '[CITY] CURRENT_CITY_FAILURE';

export class CurrCity implements Action {
    readonly type = CURRENT_CITY;
    constructor(public payload: CityKeys[]) { }
}

export class CurrCitySuccess implements Action {
    readonly type = CURRENT_CITY_SUCCESS;
    constructor(public payload: CityWeather[]) { }
}

export class CurrCityFailure implements Action {
    readonly type = CURRENT_CITY_FAILURE;
    constructor(public payload: Error) { }
}

export type All
    = CurrCity
    | CurrCitySuccess
    | CurrCityFailure;