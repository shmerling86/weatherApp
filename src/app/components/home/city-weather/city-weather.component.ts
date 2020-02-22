import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as CurrCityActions from '../store/current/currCity.actions';

import { CityWeather } from 'src/app/interfaces/CityWeather';
import { CityKeys } from 'src/app/interfaces/CityKeys';
import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { ToastrService } from 'ngx-toastr';
import { DegreeType } from 'src/app/enum/DegreeType.enum';

@Component({
  selector: 'city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements  OnInit, OnDestroy {

  cityWeather: CityWeather;
  weekForecasts: DailyForecasts[] = [];
    
  currCity: CityKeys;
  degreeType: DegreeType;
  degreeTypes = DegreeType;
  isLoading: boolean;
  
  currCitySub: Subscription;
  weatherSub: Subscription;
  degreeTypeSub: Subscription;
  
  constructor(
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }
  
  ngOnInit(): void {
    this.degreeTypeSub = this.store.select('degreeType').subscribe((degreeType) => this.degreeType = degreeType.degreeType);
    this.getCurrCity();
  }

  getCurrCity(): void {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => {
      this.isLoading = defaultCity.isLoading;
      if (defaultCity.error !== undefined) this.toastr.error(defaultCity.error.message);
      if (!this.isLoading && defaultCity.weather !== null) this.cityWeather = defaultCity.weather[0];
      this.currCity = defaultCity.city[0];
    });
    this.store.dispatch(new CurrCityActions.CurrCity([this.currCity]))
  }

  ngOnDestroy(): void {
    if (this.currCitySub != undefined) this.currCitySub.unsubscribe();
    if (this.degreeTypeSub != undefined) this.degreeTypeSub.unsubscribe();
    if (this.weatherSub != undefined) this.weatherSub.unsubscribe();
  }

}
