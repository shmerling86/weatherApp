import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';

import * as WeatherActions from './weekWeather.actions';
import { MainService } from 'src/app/services/api.service';
import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { DegreeType } from 'src/app/enum/DegreeType.enum';


@Injectable()
export class WeekWeatherEffects {

    @Effect()
    weekWeather$ = this.actions$
        .pipe(
            ofType<WeatherActions.WeekWeather>(WeatherActions.WEEK_WEATHER),
            mergeMap((city) => {
                return this.http
                    .get<DailyForecasts[]>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.payload.key}`,{
                        params:{
                            apikey: this.mainService.API,
                            details: 'true',
                            metric: String(city.payload.degreeType !== DegreeType.Celsius)
                        }
                    })
                    .pipe(map(data => { return new WeatherActions.WeekWeatherSuccess(data) }),
                        catchError(error => of(new WeatherActions.WeekWeatherFailure(error)))
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

