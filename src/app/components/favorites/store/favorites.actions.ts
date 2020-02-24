import { Action } from '@ngrx/store';
import { Favorite } from 'src/app/interfaces/Favorite';
import { HourlyWeather } from 'src/app/interfaces/HourlyWeather';
import { ForecastKeys } from 'src/app/interfaces/ForecastKeys';

export const ADD_FAVORITE = '[FAVORITE] ADD_FAVORITE';
export const REMOVE_FAVORITE = '[FAVORITE] REMOVE_FAVORITE';
export const FAVORITE_PREVIEW = '[FAVORITE] FAVORITE_PREVIEW';
export const FAVORITE_PREVIEW_SUCCESS = '[FAVORITE] FAVORITE_PREVIEW_SUCCESS';
export const FAVORITE_PREVIEW_FAILURE = '[FAVORITE] FAVORITE_PREVIEW_FAILURE';


export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE;
    constructor(public payload: Favorite) { }
}

export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE;
    constructor(public payload: string) { }
}

export class FavoritePreview implements Action {
    readonly type = FAVORITE_PREVIEW;
    constructor(public payload: ForecastKeys) { }
}

export class FavoritePreviewSuccess implements Action {
    readonly type = FAVORITE_PREVIEW_SUCCESS;
    constructor(public payload: HourlyWeather[]) { }
}

export class FavoritePreviewFailure implements Action {
    readonly type = FAVORITE_PREVIEW_FAILURE;
    constructor(public payload: Error) { }
}

export type All
    = AddFavorite
    | RemoveFavorite
    | FavoritePreview
    | FavoritePreviewSuccess
    | FavoritePreviewFailure;