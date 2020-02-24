import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromApp from '../app/store/app.reducer';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/home/search/search.component';
import { MainService } from './services/api.service';

import { EffectsModule } from '@ngrx/effects';
import { ResultsEffects } from './components/home/search/store/search.effect';
import { CurrCityEffects } from './components/home/store/current/currCity.effect';
import { WeekWeatherEffects } from './components/home/store/weekWeather/weekWeather.effect';
import { currCityByPositionEffects } from './components/home/store/currentByPosition/currentByPosition.effect';
import { FavoritesPreviewEffects } from './components/favorites/store/favorites.effect';

import { CityWeatherComponent } from './components/home/city-weather/city-weather.component';
import { WeekForecastsComponent } from './components/home/week-forecasts/week-forecasts.component';
import { HomeMenuComponent } from './components/home/home-menu/home-menu.component';
import { DetailsComponent } from './components/favorites/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    NavbarComponent,
    SearchComponent,
    CityWeatherComponent,
    WeekForecastsComponent,
    HomeMenuComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ResultsEffects, CurrCityEffects, currCityByPositionEffects, WeekWeatherEffects, FavoritesPreviewEffects]),
    StoreDevtoolsModule.instrument({maxAge: 10 }),
    MatDialogModule,
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
