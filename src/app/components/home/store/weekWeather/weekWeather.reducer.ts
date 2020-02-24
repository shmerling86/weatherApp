import * as HomeActions from './weekWeather.actions';
import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { DegreeType } from 'src/app/enum/DegreeType.enum';

export type Action = HomeActions.All;

export interface weekState {
    cityForecast: DailyForecasts[],
    degreeType: DegreeType,
    isLoading: boolean,
    isDayForecast: boolean,
    isMoreInfoOpen: boolean,
    error: Error
}

const defaultState: weekState = {
    cityForecast: null,
    degreeType: DegreeType.Celsius,
    isLoading: false,
    isDayForecast: true,
    isMoreInfoOpen: false, 
    error: undefined
}

export function weekReducer(
    state: weekState = defaultState,
    action: HomeActions.All
) {
    switch (action.type) {
        case HomeActions.WEEK_WEATHER:
            return {
                ...state,
                isLoading: true
            };
        case HomeActions.WEEK_WEATHER_SUCCESS:
            return {
                ...state,
                cityForecast: action.payload,
                isLoading: false
            };
        case HomeActions.WEEK_WEATHER_FAILURE:
            return {
                ...state,
                error: action.payload,
                cityForecast: null,
            };
        case HomeActions.SWITCH_DEGREE_TYPE:
            return {
                ...state,
                degreeType: state.degreeType === DegreeType.Celsius ? DegreeType.Fahrenheit : DegreeType.Celsius
            };
        case HomeActions.DAY_FORECAST_ON: {
            return {
                ...state,
                isDayForecast: true
            }
        };
        case HomeActions.DAY_FORECAST_OFF: {
            return {
                ...state,
                isDayForecast: false
            }
        };
        case HomeActions.MORE_INFO_ON: {
            return {
                ...state,
                isMoreInfoOpen: true
            }
        };
        case HomeActions.MORE_INFO_OFF: {
            return {
                ...state,
                isMoreInfoOpen: false
            }
        };
        default:
            return state;
    }
}
