import { Action } from '@ngrx/store';
import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { ForecastKeys } from 'src/app/interfaces/ForecastKeys';

export const WEEK_WEATHER = '[WEEK] WEEK_WEATHER';
export const WEEK_WEATHER_SUCCESS = '[WEEK] WEEK_WEATHER_SUCCESS';
export const WEEK_WEATHER_FAILURE = '[WEEK] WEEK_WEATHER_FAILURE';
export const SWITCH_DEGREE_TYPE = '[DEGREE] SWITCH_DEGREE_TYPE'

export class WeekWeather implements Action {
    readonly type = WEEK_WEATHER;
    constructor(public payload: ForecastKeys) {}
}

export class WeekWeatherSuccess implements Action {
    readonly type = WEEK_WEATHER_SUCCESS;
    constructor(public payload: DailyForecasts[]) {}
}

export class WeekWeatherFailure implements Action {
    readonly type = WEEK_WEATHER_FAILURE;
    constructor(public payload: Error ) {}
}

export class SwitchDegreeType implements Action {
    readonly type = SWITCH_DEGREE_TYPE;
}

export type All
    = WeekWeather
    | WeekWeatherSuccess
    | WeekWeatherFailure
    | SwitchDegreeType;