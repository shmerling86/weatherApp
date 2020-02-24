import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as FavoritesActions from '../favorites/store/favorites.actions';
import * as CurrCityActions from '../../components/home/store/current/currCity.actions';


import { ToastrService } from 'ngx-toastr';
import { CityKeys } from 'src/app/interfaces/CityKeys';
import { Favorite } from 'src/app/interfaces/Favorite';
import { DetailsComponent } from '../favorites/details/details.component';
import { DegreeType } from 'src/app/enum/DegreeType.enum';
import { HourlyWeather } from 'src/app/interfaces/HourlyWeather';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favoritCities: Favorite[] = JSON.parse(localStorage.getItem('favoriteCities')) || [];
  degreeType: DegreeType;
  preview: HourlyWeather;
  favoriteInfo: any;

  favoritesSub: Subscription;
  degreeTypeSub: Subscription;
  previewSub: Subscription;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.favoritesSub = this.store.select('favorites').subscribe((favorites) => {
      if (this.favoritCities.length === 0) this.favoritCities = favorites.favorites
    })

  }

  previewFavData(cityKey): void {
    this.degreeTypeSub = this.store.select('degreeType').subscribe((degreeType) => this.degreeType = degreeType.degreeType);
    this.store.dispatch(new FavoritesActions.FavoritePreview({ key: cityKey, degreeType: this.degreeType }));
    const dialogConfig = new MatDialogConfig();
    this.previewSub = this.store.select('favorites').subscribe(favorites => {
      if (favorites.error !== undefined) this.toastr.error(favorites.error.message);
      if (!favorites.isLoading) {
        this.favoriteInfo = favorites;
        dialogConfig.data = this.favoriteInfo.preview[0];
      }
    });
    console.log(dialogConfig.data);
    if (dialogConfig.data) this.dialog.open(DetailsComponent, dialogConfig);
  }

  setCityWeather(cityKeys: CityKeys): void {
    this.store.dispatch(new CurrCityActions.CurrCity([cityKeys]));
    this.router.navigate(['/home']);
    this.toastr.success(`Weather in ${cityKeys.name} is selected`);
  }

  removefromFavorites(cityKey: string): void {
    this.favoritCities = this.favoritCities.filter((favorite) => cityKey !== favorite.city.key);
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoritCities));
    this.store.dispatch(new FavoritesActions.RemoveFavorite(cityKey));
    this.toastr.info('Item removed');
  }

  ngOnDestroy(): void {
    if (this.favoritesSub != undefined) this.favoritesSub.unsubscribe();
    if (this.degreeTypeSub != undefined) this.degreeTypeSub.unsubscribe();
    if (this.previewSub != undefined) this.previewSub.unsubscribe();
  }


}
