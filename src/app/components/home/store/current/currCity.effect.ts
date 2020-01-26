import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as CurrCityActions from './currCity.actions';

import { MainService } from 'src/app/services/main.service';
import { CityWeather } from 'src/app/interfaces/CityWeather';

@Injectable()
export class CurrCityEffects {

    @Effect() currCity$ = this.actions$.pipe(
        ofType<CurrCityActions.CurrCity>(CurrCityActions.CURRENT_CITY),
        switchMap((city) => {
            return this.http
                .get<CityWeather[]>("./assets/db.json")
                // .get<CityWeather[]>(`https://dataservice.accuweather.com/currentconditions/v1/${city.payload[0]["key"]}?apikey=${this.mainService.API}`)
                .pipe(map(data => { return new CurrCityActions.CurrCitySuccess(data) }),
                    catchError(error => of(new CurrCityActions.CurrCityFailure(error)))
                )
        }
        )
    )

    @Effect() currCityByPosition$ = this.actions$.pipe(
        ofType<CurrCityActions.CurrCityByPosition>(CurrCityActions.CURRENT_CITY_BY_POSITION),
        switchMap((city) => {
            return this.http
                .get<CityWeather[]>('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
                    { params: { apikey: 'WOCWl0IuLsZtnxJL359UTC2ppdRwXGOq', q: `${city.payload[0]['lat']},${city.payload[0]['lon']}` } })
                .pipe(map(data => { return new CurrCityActions.CurrCityByPositionSuccess(data) }),
                    catchError(error => {
                        return of(new CurrCityActions.CurrCityByPositionFailure(error))
                    })
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

