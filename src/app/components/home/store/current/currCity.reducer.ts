import * as CurrCityActions from '../current/currCity.actions';
import { CityKeys } from 'src/app/interfaces/CityKeys';
import { CityWeather } from 'src/app/interfaces/CityWeather';


export type Action = CurrCityActions.All;

export interface currentCityState {
    city: CityKeys[],
    weather: CityWeather[],
    isLoading: boolean,
    error: Error
}

const defaultState: currentCityState = {
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
            };
        default:
            return state;
    }
}
