import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as CurrCityActions from '../store/current/currCity.actions';

import { CityWeather } from 'src/app/interfaces/CityWeather';
import { CityKey } from 'src/app/interfaces/CityKey';
import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { ToastrService } from 'ngx-toastr';
import { DegreeType } from 'src/app/enum/DegreeType.enum';

@Component({
  selector: 'city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements  OnInit, OnDestroy {

  @Input() cityWeather: CityWeather;
  
  currCityKey: CityKey;
  weekForecasts: DailyForecasts[] = [];
  degreeType: DegreeType;
  degreeTypes = DegreeType;
  
  currCitySub: Subscription;
  weatherSub: Subscription;
  degreeTypeSub: Subscription;
  
  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }
  
  ngOnInit(): void {
    this.degreeTypeSub = this.store.select('degreeType').subscribe((degreeType) => this.degreeType = degreeType.degreeType);
    this.getCurrCity();
  }

  getCurrCity(): void {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => {
      if (defaultCity.error !== undefined) this.toastr.error(defaultCity.error.message);
      this.currCityKey = defaultCity.city[0];
    });
    this.store.dispatch(new CurrCityActions.CurrCity([this.currCityKey]))
  }

  ngOnDestroy(): void {
    if (this.currCitySub != undefined) this.currCitySub.unsubscribe();
    if (this.degreeTypeSub != undefined) this.degreeTypeSub.unsubscribe();
    if (this.weatherSub != undefined) this.weatherSub.unsubscribe();
  }

}