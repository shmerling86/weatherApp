import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as FavoritesActions from '../favorites/store/favorites.action';
import * as CurrCityActions from '../../components/home/store/current/currCity.actions';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { CityKey } from 'src/app/interfaces/CityKey';
import { Favorite } from 'src/app/interfaces/Favorite';
import { DegreeType } from 'src/app/enum/DegreeType.enum';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favoritCities: Favorite[] = JSON.parse(localStorage.getItem('favoriteCities')) || [];
  degreeType: DegreeType;
  objOfdegreeTypes = DegreeType;
  currCityKey: CityKey;

  degreeTypeSub: Subscription;
  favoritesSub: Subscription;
  currCitySub: Subscription;


  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.degreeTypeSub = this.store.select('degreeType')
      .subscribe((degreeType) => this.degreeType = degreeType.degreeType);
      this.favoritesSub = this.store.select('favorites').subscribe((favorites) => { if (this.favoritCities.length === 0) this.favoritCities = favorites.favorites })
  }

  removeFromFavorites(cityKey: string): void {
    this.favoritCities = this.favoritCities.filter((favorite) => cityKey !== favorite.city.key);
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities))
    this.store.dispatch(new FavoritesActions.RemoveFavorite(cityKey));
    this.toastr.info('Item removed');
  }

  setCityWeather(cityKey: CityKey): void {
    this.currCitySub = this.store.select('currCity').subscribe(defaultCity => {
      if (defaultCity.error !== undefined) this.toastr.error(defaultCity.error.message);
      this.currCityKey = defaultCity.city[0];
    });
    this.store.dispatch(new CurrCityActions.CurrCity([cityKey]));
    this.router.navigate(['/home']);
    this.toastr.success(`Weather in ${cityKey.name} is selected`);
  }

  ngOnDestroy(): void {
    if (this.favoritesSub != undefined) this.favoritesSub.unsubscribe();
    this.degreeTypeSub.unsubscribe();
    if (this.currCitySub != undefined) this.currCitySub.unsubscribe()

  }


}
