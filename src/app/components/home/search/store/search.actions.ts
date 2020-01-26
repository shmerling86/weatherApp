import { Action } from '@ngrx/store';
import { AutoComplete } from 'src/app/interfaces/AutoComplete';

export const SEARCH_RESULTS = '[SEARCH] RESULTS';
export const SEARCH_RESULTS_SUCCESS = '[SEARCH] RESULTS SUCCESS';
export const SEARCH_RESULTS_FAILURE = '[SEARCH] RESULTS FAILURE';

export class SearchResults implements Action {
    readonly type = SEARCH_RESULTS;
    constructor(public payload: string) { }
}

export class SearchResultsSuccess implements Action {
    readonly type = SEARCH_RESULTS_SUCCESS;
    constructor(public payload: AutoComplete[]) { }
}

export class SearchResultsFailure implements Action {
    readonly type = SEARCH_RESULTS_FAILURE;
    constructor(public payload: Error ) {}
}

export type All
    = SearchResults
    | SearchResultsSuccess
    | SearchResultsFailure;