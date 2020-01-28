import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';

import * as ResultsActions from './store/search.actions';
import * as CurrCityActions from '../../../components/home/store/current/currCity.actions';
import * as WeatherActions from '../../../components/home/store/weekWeather/weekWeather.actions';
import * as StackResultsActions from '../../../components/home/search/store/search.actions'

import { ToastrService } from 'ngx-toastr';
import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { AutoComplete } from 'src/app/interfaces/AutoComplete';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  
  typedSearchForm: FormGroup;
  stackResults: AutoComplete[];
  degreeType: DegreeType;

  favoritesSub: Subscription;
  resultSub: Subscription;

  constructor(
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {    
    this.typedSearchForm = new FormGroup({ typedSearch: new FormControl() });
    this.store.select('degreeType').subscribe((degreeType) => this.degreeType = degreeType.degreeType)
  }

  changeCurrCity(currCityKey): void {
    this.store.dispatch(new CurrCityActions.CurrCity([currCityKey]));
    this.store.dispatch(new WeatherActions.WeekWeather({ key: currCityKey.key, degreeType: this.degreeType }));
    this.store.dispatch(new StackResultsActions.SearchResults(''));
    this.typedSearchForm.setValue({ typedSearch: '' })
  }

  getCitiesWeather(typedText): void {
    (typedText) ? this.store.dispatch(new ResultsActions.SearchResults(typedText)) : this.stackResults = [];
    this.resultSub = this.store.select('stackResults').subscribe(stackResult => {
      if (stackResult.error !== undefined) this.toastr.error(stackResult.error.message);
      if (!stackResult.isLoading) this.stackResults = stackResult.list});
  }

  checkLang(event: KeyboardEvent): boolean {
    if (event.code.substring(0, 5) === 'Digit') {
      event.preventDefault();
      this.toastr.error('Please type only english letters!');
    }
    let k;
    k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  ngOnDestroy(): void {
    if (this.favoritesSub != undefined) this.favoritesSub.unsubscribe();
    if (this.resultSub != undefined) this.resultSub.unsubscribe();
  }

}