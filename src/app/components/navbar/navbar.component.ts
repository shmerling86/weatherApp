import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { CityKey } from 'src/app/interfaces/CityKey';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  degreeType: DegreeType;
  currCityKey: CityKey;

  currCitySub: Subscription;
  degreeTypeSub: Subscription;

  constructor(public router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.degreeTypeSub = this.store.select('degreeType').subscribe(defaultCity => { this.degreeType = defaultCity.degreeType });
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => { this.currCityKey = defaultCity.city[0] });
  }

  ngOnDestroy(): void {
    this.degreeTypeSub.unsubscribe();
    this.currCitySub.unsubscribe();
  }
}
