import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../interfaces/game';
import { ListType } from '../enums/list-type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  ownedGames = new BehaviorSubject<Game[]>([]);
  wishListGames = new BehaviorSubject<Game[]>([]);

  constructor() { }

  saveGame(game: Game, listType: ListType) {
    let gameList: Game[] = JSON.parse(window.localStorage.getItem(listType.valueOf())!);
    if (!gameList) {
        gameList = [game];
    } else {
        gameList = [...gameList, game];
    }
    window.localStorage.setItem(listType.valueOf(), JSON.stringify(gameList));

    const parsedUpdateList = JSON.parse(window.localStorage.getItem(listType.valueOf())!);
    if (listType === ListType.OWNEDLIST) {
        this.ownedGames.next(parsedUpdateList);
    } else {
        this.wishListGames.next(parsedUpdateList);
    }
  }

  deleteGame(game: Game, listType: ListType) {
    let gameList: Game[] = JSON.parse(window.localStorage.getItem(listType.valueOf())!);
    const gameIndex = gameList.findIndex(currGame => currGame.id === game.id);
    if (gameIndex > -1) {
        gameList.splice(gameIndex, 1)
        window.localStorage.setItem(listType.valueOf(), JSON.stringify(gameList));
    }

    if (listType === ListType.OWNEDLIST) {
        this.ownedGames.next(gameList.length > 0 ? gameList : []);
    } else {
        this.wishListGames.next(gameList.length > 0 ? gameList : []);
    }
  }

  getGameList(listType: ListType) {
    let list = JSON.parse(window.localStorage.getItem(listType.valueOf())!);

    if (listType === ListType.OWNEDLIST) {
        this.ownedGames.next(!list ? [] : list);
    } else {
        this.wishListGames.next(!list ? [] : list);
    }
}
}
