import { Action } from '@ngrx/store';
import { CityDataByPosition } from 'src/app/interfaces/CityDataByPosition';
import { CityPosition } from 'src/app/interfaces/CityPosition';


export const CURRENT_CITY_BY_POSITION = '[CITY_BY_POSITION] CURRENT_CITY_BY_POSITION';
export const CURRENT_CITY_BY_POSITION_SUCCESS = '[CITY_BY_POSITION] CURRENT_CITY_BY_POSITION_SUCCESS';
export const CURRENT_CITY_BY_POSITION_FAILURE = '[CITY_BY_POSITION] CURRENT_CITY_BY_POSITION_FAILURE';

export class CurrCityByPosition implements Action {
    readonly type = CURRENT_CITY_BY_POSITION;
    constructor(public payload: CityPosition[]) { }
}

export class CurrCityByPositionSuccess implements Action {
    readonly type = CURRENT_CITY_BY_POSITION_SUCCESS;
    constructor(public payload: CityDataByPosition[]) { }
}

export class CurrCityByPositionFailure implements Action {
    readonly type = CURRENT_CITY_BY_POSITION_FAILURE;
    constructor(public payload: Error) { }
}

export type All
    = CurrCityByPosition
    | CurrCityByPositionSuccess
    | CurrCityByPositionFailure
