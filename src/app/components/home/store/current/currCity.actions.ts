import { Action } from '@ngrx/store';
import { CityKey } from 'src/app/interfaces/CityKey';
import { CityWeather } from 'src/app/interfaces/CityWeather';


export const CURRENT_CITY = '[CITY] CURRENT_CITY';
export const CURRENT_CITY_SUCCESS = '[CITY] CURRENT_CITY_SUCCESS';
export const CURRENT_CITY_FAILURE = '[CITY] CURRENT_CITY_FAILURE';
export const CURRENT_CITY_BY_POSITION = '[CITY_BY_POSITION] CURRENT_CITY_BY_POSITION';
export const CURRENT_CITY_BY_POSITION_SUCCESS = '[CITY_BY_POSITION] CURRENT_CITY_BY_POSITION_SUCCESS';
export const CURRENT_CITY_BY_POSITION_FAILURE = '[CITY_BY_POSITION] CURRENT_CITY_BY_POSITION_FAILURE';

export class CurrCityByPosition implements Action {
    readonly type = CURRENT_CITY_BY_POSITION;
    constructor(public payload: object[]) { }
}

export class CurrCityByPositionSuccess implements Action {
    readonly type = CURRENT_CITY_BY_POSITION_SUCCESS;
    constructor(public payload: CityWeather[]) { }
}

export class CurrCityByPositionFailure implements Action {
    readonly type = CURRENT_CITY_BY_POSITION_FAILURE;
    constructor(public payload: Error) { }
}

export class CurrCity implements Action {
    readonly type = CURRENT_CITY;
    constructor(public payload: CityKey[]) { }
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
    = CurrCityByPosition
    | CurrCityByPositionSuccess
    | CurrCityByPositionFailure
    | CurrCity
    | CurrCitySuccess
    | CurrCityFailure;