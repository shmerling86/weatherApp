import * as ResultsActions from './search.actions';
import { AutoComplete } from 'src/app/interfaces/AutoComplete';


export type Action = ResultsActions.All;

export interface resultsState {
    searchText: string,
    list: AutoComplete[],
    isLoading: boolean,
    error: Error
}

const defaultState: resultsState = {
    searchText: '',
    list: [],
    isLoading: false,
    error: undefined
}

export function resultsReducer(
    state: resultsState = defaultState,
    action: ResultsActions.All
) {
    switch (action.type) {
        case ResultsActions.SEARCH_RESULTS:
            return {
                ...state,
                searchText: action.payload,
                list: [],
                isLoading: true
            };
        case ResultsActions.SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false
            };
        case ResultsActions.SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                list: [],
            };
        default:
            return state;
    }
}
