import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import * as WeatherActions from './store/weekWeather/weekWeather.actions';
import * as currentCityActions from './store/current/currCity.actions';
import * as CurrCityByPositionActions from './store/currentByPosition/currentByPosition.actions';

import * as FavoritesActions from '../favorites/store/favorites.action';


import { ToastrService } from 'ngx-toastr';

import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { CityKey } from 'src/app/interfaces/CityKey';
import { CityWeather } from 'src/app/interfaces/CityWeather';
import { Favorite } from 'src/app/interfaces/Favorite';
import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currCityKey: CityKey;
  currCityWeather: CityWeather;

  favoritCities: Favorite[] = JSON.parse(localStorage.getItem('favoriteCities')) || [];
  degreeType: DegreeType;
  weatherArr: DailyForecasts[] = [];
  objOfdegreeTypes = DegreeType;

  weatherSub: Subscription;
  currCitySub: Subscription;
  favoritesSub: Subscription;
  degreeTypeSub: Subscription;
  currCityByPositionSub: Subscription;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getCurrCity();
    this.getCurrCityWeatherByPosition();
    this.getDailyForecasts();

  }
  
  getCurrCity(): void {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => {
      if (defaultCity.error !== undefined) this.toastr.error(defaultCity.error.message);
      if (!defaultCity.isLoading && defaultCity.weather !== null) this.currCityWeather = defaultCity.weather[0];
      this.currCityKey = defaultCity.city[0];
    });
    this.store.dispatch(new currentCityActions.CurrCity([this.currCityKey]))
  }

  getCurrCityWeatherByPosition(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.store.dispatch(new CurrCityByPositionActions.CurrCityByPosition(
          [{ lat: position.coords.latitude, lon: position.coords.longitude }])
        )
        this.currCityByPositionSub = this.store.select('currCityByPosition').subscribe(defaultCity => {
          if (!defaultCity.isLoading && defaultCity.cityDataByPosition !== null) {
            this.currCityKey = {
              name: defaultCity.cityDataByPosition[0]['LocalizedName'],
              key: defaultCity.cityDataByPosition[0]['Key']
            }
            this.store.dispatch(new currentCityActions.CurrCity([this.currCityKey]))
            this.store.dispatch(new WeatherActions.WeekWeather({ key: this.currCityKey.key, degreeType: this.degreeType }));
          }
        });
      });
    }

  }

  getDailyForecasts(): void {
    this.degreeTypeSub = this.store.select('degreeType').subscribe((degreeType) => this.degreeType = degreeType.degreeType);
    this.store.dispatch(new WeatherActions.WeekWeather({ key: this.currCityKey.key, degreeType: this.degreeType }));
    this.weatherSub = this.store.select('weekWeather').subscribe(weekWeather => {
      if (weekWeather.error !== undefined) this.toastr.error(weekWeather.error.message);
      if (weekWeather.cityForecast != null) this.weatherArr = weekWeather.cityForecast['DailyForecasts']
    });
  }

  getDays(dateString): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateString).getDay()];
  }

  isAlreadyFavorite(currCityKey: string): boolean {
    this.favoritesSub = this.store.select('favorites').subscribe(
      (favorites) => { if (this.favoritCities.length === 0) this.favoritCities = favorites.favorites });
    if (this.favoritCities.length === 0) {
      return false
    }
    return !!this.favoritCities.find((favoriteCity) => favoriteCity.city.key === currCityKey)
  }

  addToFavorites(fName, fKey): void {
    let favorite = { city: { name: fName, key: fKey }, weather: this.currCityWeather }
    this.favoritCities = [...this.favoritCities, favorite]
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities));
    this.store.dispatch(new FavoritesActions.AddFavorite(favorite))
    this.toastr.info(`${fName} added to favorites`)
  }

  removefromFavorites(cityKey): void {
    this.favoritCities = this.favoritCities.filter((favorite) => cityKey !== favorite.city.key)
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities))
    this.store.dispatch(new FavoritesActions.RemoveFavorite(cityKey));
    this.toastr.info('Item removed');
  }

  ngOnDestroy(): void {
    this.currCitySub.unsubscribe();
    this.degreeTypeSub.unsubscribe();
    if (this.currCityByPositionSub != undefined) this.currCityByPositionSub.unsubscribe();
    if (this.weatherSub != undefined) this.weatherSub.unsubscribe();
    if (this.favoritesSub != undefined) this.favoritesSub.unsubscribe();
  }

}
