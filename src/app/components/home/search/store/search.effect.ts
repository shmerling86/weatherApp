import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as ResultsActions from './search.actions';

import { MainService } from '../../../../services/api.service'
import { AutoComplete } from 'src/app/interfaces/AutoComplete';


@Injectable()
export class ResultsEffects {

    @Effect()
    resultsStack$ = this.actions$
        .pipe(
            ofType<ResultsActions.SearchResults>(ResultsActions.SEARCH_RESULTS),
            mergeMap((typedText) => {
                return this.http
                    .get<AutoComplete[]>(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.mainService.API}&q=${typedText.payload}&language=en-us`)
                    .pipe(map(data => { return new ResultsActions.SearchResultsSuccess(data) }),
                        catchError(error => of(new ResultsActions.SearchResultsFailure(error)))
                    )
            }
            )
        )



    constructor(
        private actions$: Actions,
        private http: HttpClient,
        public mainService: MainService
    ) { }
}

