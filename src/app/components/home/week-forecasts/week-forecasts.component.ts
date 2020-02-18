import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as WeatherActions from '../store/weekWeather/weekWeather.actions';

import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { ToastrService } from 'ngx-toastr';
import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { CityKeys } from 'src/app/interfaces/CityKeys';

@Component({
  selector: 'week-forecasts',
  templateUrl: './week-forecasts.component.html',
  styleUrls: ['./week-forecasts.component.scss']
})
export class WeekForecastsComponent implements OnInit, OnDestroy {

  @Input() weekForecasts: DailyForecasts[];
  currCityKey: CityKeys;
  degreeType: DegreeType;
  degreeTypes = DegreeType;
  isMoreInfoOpen: boolean;
  isDayForecast: boolean;
  degreeTypeSub: Subscription;
  weatherSub: Subscription;
  currCitySub: Subscription;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => {
      if (defaultCity.error !== undefined) this.toastr.error(defaultCity.error.message);
      this.currCityKey = defaultCity.city[0];
    });
    this.weatherSub = this.store.select('weekWeather').subscribe(res => {
      this.isMoreInfoOpen = res.isMoreInfoOpen;
      this.isDayForecast = res.isDayForecast;
    })
    this.getDailyForecasts();
  }

  getDays(dateString): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateString).getDay()];
  }

  getMoreInfo(): void {
    (this.isMoreInfoOpen) ?
      this.store.dispatch(new WeatherActions.moreInfoOff) :
      this.store.dispatch(new WeatherActions.moreInfoOn);
  }

  getDailyForecasts(): void {
    this.degreeTypeSub = this.store.select('degreeType').subscribe((degreeType) => this.degreeType = degreeType.degreeType);
    this.store.dispatch(new WeatherActions.WeekWeather({ key: this.currCityKey.key, degreeType: this.degreeType }));
    this.weatherSub = this.store.select('weekWeather').subscribe(weekWeather => {
      if (weekWeather.error !== undefined) this.toastr.error(weekWeather.error.message);
      if (!weekWeather.isLoading && weekWeather.cityForecast != null) this.weekForecasts = weekWeather.cityForecast['DailyForecasts']
    });
  }

  ngOnDestroy(): void {
    if (this.weatherSub != undefined) this.weatherSub.unsubscribe();
    if (this.degreeTypeSub != undefined)this.degreeTypeSub.unsubscribe();
    if (this.currCitySub != undefined)this.currCitySub.unsubscribe();
  }
}
