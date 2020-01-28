
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as CurrCityActionsByPosition from './currentByPosition.actions';

import { MainService } from 'src/app/services/main.service';
import { CityDataByPosition } from 'src/app/interfaces/CityDataByPosition';


@Injectable()
export class currCityByPositionEffects {

    @Effect() currCityByPosition$ = this.actions$.pipe(
        ofType<CurrCityActionsByPosition.CurrCityByPosition>(CurrCityActionsByPosition.CURRENT_CITY_BY_POSITION),
        switchMap((city) => {            
            return this.http
            .get<CityDataByPosition[]>('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
                { params: { apikey: 'WOCWl0IuLsZtnxJL359UTC2ppdRwXGOq', q: `${city.payload[0]['lat']},${city.payload[0]['lon']}` } })
                // .get<CityDataByPosition[]>("./assets/cityByPosition.json")
                .pipe(
                    map(weatherByPosition => { return new CurrCityActionsByPosition.CurrCityByPositionSuccess(weatherByPosition) }),
                    catchError(error => {
                        return of(new CurrCityActionsByPosition.CurrCityByPositionFailure(error))
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