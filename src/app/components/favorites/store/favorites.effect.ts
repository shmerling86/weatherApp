import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';

import * as FavoritesActions from './favorites.actions';
import { MainService } from 'src/app/services/api.service';
import { HourlyWeather } from 'src/app/interfaces/HourlyWeather';
import { DegreeType } from 'src/app/enum/DegreeType.enum';


@Injectable()
export class FavoritesPreviewEffects {

    @Effect()
    weekWeather$ = this.actions$
        .pipe(
            ofType<FavoritesActions.FavoritePreview>(FavoritesActions.FAVORITE_PREVIEW),
            mergeMap((city) => {
                return this.http
                    .get<HourlyWeather[]>(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${city.payload.key}`,{
                        params:{
                            apikey: this.mainService.API,
                            details: 'true',
                            metric: String(city.payload.degreeType !== DegreeType.Celsius)
                        }
                    })
                    .pipe(map(data => { return new FavoritesActions.FavoritePreviewSuccess(data) }),
                        catchError(error => of(new FavoritesActions.FavoritePreviewFailure(error)))
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

