import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as WeatherActions from './store/weekWeather/weekWeather.actions';
import * as CurrCityActions from './store/current/currCity.actions';
import * as CurrCityByPositionActions from './store/currentByPosition/currentByPosition.actions';
import * as FavoritesActions from '../favorites/store/favorites.action';

import { ToastrService } from 'ngx-toastr';

import { DailyForecasts } from 'src/app/interfaces/DailyForecasts';
import { CityKey } from 'src/app/interfaces/CityKey';
import { CityWeather } from 'src/app/interfaces/CityWeather';
import { Favorite } from 'src/app/interfaces/Favorite';
import { DegreeType } from 'src/app/enum/DegreeType.enum';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  favoritCities: Favorite[] = JSON.parse(localStorage.getItem('favoriteCities')) || [];
  isDayForecast: boolean;
  degreeType: DegreeType;
  degreeTypes = DegreeType;
  currCityKey: CityKey;
  weekForecasts: DailyForecasts[] = [];

  currCitySub: Subscription;
  weatherSub: Subscription;
  favoritesSub: Subscription;
  currCityByPositionSub: Subscription;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => {
      if (defaultCity.error !== undefined) this.toastr.error(defaultCity.error.message);
      this.currCityKey = defaultCity.city[0];
    });
    this.weatherSub = this.store.select('weekWeather').subscribe(res => {
      this.isDayForecast = res.isDayForecast;
    })
  }

  isAlreadyFavorite(cityKey: string): boolean {
    this.favoritesSub = this.store.select('favorites').subscribe(
      (favorites) => { if (this.favoritCities.length === 0) this.favoritCities = favorites.favorites });
    if (this.favoritCities.length === 0) {
      return false
    }
    return !!this.favoritCities.find((favoriteCity) => favoriteCity.city.key === cityKey)
  }

  addToFavorites(fName, fKey): void {
    let favorite = { city: { name: fName, key: fKey } }
    this.favoritCities = [...this.favoritCities, favorite]
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities));
    this.store.dispatch(new FavoritesActions.AddFavorite(favorite))
    this.toastr.info(`${fName} added to favorites`)
  }

  removefromFavorites(cityKey: string): void {
    this.favoritCities = this.favoritCities.filter((favorite) => cityKey !== favorite.city.key);
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities));
    this.store.dispatch(new FavoritesActions.RemoveFavorite(cityKey));
    this.toastr.info('Item removed');
  }

  switchDegreeMode(): void {
    this.store.dispatch(new WeatherActions.SwitchDegreeType());
    this.store.dispatch(new WeatherActions.WeekWeather({ key: this.currCityKey.key, degreeType: this.degreeType }));
  }

  switchToGpsCity(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.store.dispatch(new CurrCityByPositionActions.CurrCityByPosition(
          [{ lat: position.coords.latitude, lon: position.coords.longitude }]))
        this.currCityByPositionSub = this.store.select('currCityByPosition').subscribe(
          defaultCity => {
            if (!defaultCity.isLoading && defaultCity.cityDataByPosition !== null) {
              this.currCityKey = {
                name: defaultCity.cityDataByPosition['LocalizedName'],
                key: defaultCity.cityDataByPosition['Key']
              }
              this.store.dispatch(new CurrCityActions.CurrCity([this.currCityKey]))
              this.store.dispatch(new WeatherActions.WeekWeather({ key: this.currCityKey.key, degreeType: this.degreeType }));
            }
          });
      });
    }
  }
  changeForecastView(): void {
    (this.isDayForecast) ?
      this.store.dispatch(new WeatherActions.nightForecast) :
      this.store.dispatch(new WeatherActions.dayForecast);
  }

  ngOnDestroy(): void {
    if (this.currCitySub != undefined) this.currCitySub.unsubscribe();
    if (this.favoritesSub != undefined) this.favoritesSub.unsubscribe();
    if (this.currCityByPositionSub != undefined) this.currCityByPositionSub.unsubscribe();
    if (this.weatherSub != undefined) this.weatherSub.unsubscribe();
  }

}
