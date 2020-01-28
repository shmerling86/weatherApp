import * as CurrCityActions from '../current/currCity.actions';
import { CityKey } from 'src/app/interfaces/CityKey';
import { CityWeather } from 'src/app/interfaces/CityWeather';
import { CityDataByPosition } from 'src/app/interfaces/CityDataByPosition';
import { CityPosition } from 'src/app/interfaces/CityPosition';


export type Action = CurrCityActions.All;

export interface currentCityState {
    // cityPosition: CityPosition[],
    city: CityKey[],
    // cityDataByPosition: CityDataByPosition[], 
    weather: CityWeather[],
    isLoading: boolean,
    error: Error
}

const defaultState: currentCityState = {
    // cityPosition: null,
    // cityDataByPosition: null,
    city:
        [{
            name: 'Tel Aviv',
            key: '215854'
        }],
    weather: [],
    isLoading: false,
    error: undefined
}

export function currentCityReducer(
    state: currentCityState = defaultState,
    action: CurrCityActions.All
) {
    switch (action.type) {

        case CurrCityActions.CURRENT_CITY:
            return {
                ...state,
                city: action.payload,
                isLoading: true
            };
        case CurrCityActions.CURRENT_CITY_SUCCESS:
            return {
                ...state,
                weather: action.payload,
                isLoading: false
            };
        case CurrCityActions.CURRENT_CITY_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}
