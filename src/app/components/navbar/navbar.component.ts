import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as WeatherActions from '../home/store/weekWeather/weekWeather.actions';
import { Subscription } from 'rxjs';

import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { CityKey } from 'src/app/interfaces/CityKey';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currCityKey: CityKey;
  degreeType: DegreeType;
  objOfdegreeTypes = DegreeType;
  
  currCitySub: Subscription;
  degreeTypeSub: Subscription;

  constructor(public router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => { this.currCityKey = defaultCity.city[0] });
    this.degreeTypeSub = this.store.select('degreeType').subscribe(defaultCity => { this.degreeType = defaultCity.degreeType });
  }

  switchDegreeMode(): void {
    this.store.dispatch(new WeatherActions.SwitchDegreeType())
    this.store.dispatch(new WeatherActions.WeekWeather({ key: this.currCityKey.key, degreeType: this.degreeType }));
  }

  ngOnDestroy(): void {
    this.currCitySub.unsubscribe();
    this.degreeTypeSub.unsubscribe();
  }
}
