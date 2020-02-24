import * as CurrCityActionsByPosition from './currentByPosition.actions';
import { CityDataByPosition } from 'src/app/interfaces/CityDataByPosition';
import { CityPosition } from 'src/app/interfaces/CityPosition';


export type Action = CurrCityActionsByPosition.All;

export interface currentCityByPositionState {
    cityPosition: CityPosition[],
    cityDataByPosition: CityDataByPosition[], 
    isLoading: boolean,
    error: Error
}

const defaultState: currentCityByPositionState = {
    cityPosition: null,
    cityDataByPosition: null,
    isLoading: false,
    error: undefined
}

export function currentCityReducer(
    state: currentCityByPositionState = defaultState,
    action: CurrCityActionsByPosition.All
) {
    switch (action.type) {
        case CurrCityActionsByPosition.CURRENT_CITY_BY_POSITION:
            return {
                ...state,
                cityPosition: action.payload,
                isLoading: true
            };
        case CurrCityActionsByPosition.CURRENT_CITY_BY_POSITION_SUCCESS:            
            return {
                ...state,
                cityDataByPosition: action.payload,
                isLoading: false
            };
        case CurrCityActionsByPosition.CURRENT_CITY_BY_POSITION_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
       
        default:
            return state;
    }
}
