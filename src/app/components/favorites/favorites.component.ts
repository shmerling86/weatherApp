import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as FavoritesActions from '../favorites/store/favorites.action';
import * as CurrCityActions from '../../components/home/store/current/currCity.actions';

import { ToastrService } from 'ngx-toastr';
import { CityKeys } from 'src/app/interfaces/CityKeys';
import { Favorite } from 'src/app/interfaces/Favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favoritCities: Favorite[] = JSON.parse(localStorage.getItem('favoriteCities')) || [];
  favoritesSub: Subscription;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.favoritesSub = this.store.select('favorites').subscribe((favorites) => {
      if (this.favoritCities.length === 0) this.favoritCities = favorites.favorites
    })
  }

  removefromFavorites(cityKey: string): void {
    this.favoritCities = this.favoritCities.filter((favorite) => cityKey !== favorite.city.key);
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities));
    this.store.dispatch(new FavoritesActions.RemoveFavorite(cityKey));
    this.toastr.info('Item removed');
  }

  setCityWeather(cityKeys: CityKeys): void {
    this.store.dispatch(new CurrCityActions.CurrCity([cityKeys]));
    this.router.navigate(['/home']);
    this.toastr.success(`Weather in ${cityKeys.name} is selected`);
  }

  ngOnDestroy(): void {
    if (this.favoritesSub != undefined) this.favoritesSub.unsubscribe();
  }


}
