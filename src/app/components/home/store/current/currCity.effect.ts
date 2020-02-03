import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as CurrCityActions from './currCity.actions';

import { MainService } from 'src/app/services/api.service';
import { CityWeather } from 'src/app/interfaces/CityWeather';

@Injectable()
export class CurrCityEffects {
    @Effect() currCity$ = this.actions$.pipe(
        ofType<CurrCityActions.CurrCity>(CurrCityActions.CURRENT_CITY),
        switchMap((city) => {
            return this.http
                .get<CityWeather[]>(`https://dataservice.accuweather.com/currentconditions/v1/${city.payload[0]["key"]}?apikey=${this.mainService.API}`)
                .pipe(
                    map(CityWeather => { return new CurrCityActions.CurrCitySuccess(CityWeather) }),
                    catchError(error => of(new CurrCityActions.CurrCityFailure(error)))
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

