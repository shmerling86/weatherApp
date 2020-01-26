import { Action } from '@ngrx/store';
import { Favorite } from 'src/app/interfaces/Favorite';

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';


export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE;
    constructor(public payload: Favorite) { }
}

export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE;
    constructor(public payload: string) { }
}

export type All
    = AddFavorite
    | RemoveFavorite;