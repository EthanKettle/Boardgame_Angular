import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/interfaces/game';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ListType } from 'src/app/enums/list-type';
import * as _ from 'lodash';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent implements OnInit {
  searchText: string = '';
  games: Game[] = [];
  ownedGames: {[id: string]: Game} = {};
  wishListGames: {[id: string]: Game} = {};

  constructor(
    private gameService: GameService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorageService.getGameList(ListType.OWNEDLIST);
    this.localStorageService.getGameList(ListType.WISHLIST);

    this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
    this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
  }

  search() {
    this.gameService.searchByName(this.searchText).subscribe(games => this.games = games);
  }

  updateOwnedList(event: MouseEvent, game: Game) {
    event.stopPropagation();

    if (this.ownedGames[game.id]) {
        this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
    } else {
        if (this.wishListGames[game.id]) {
            this.localStorageService.deleteGame(game, ListType.WISHLIST);
        }
        this.localStorageService.saveGame(game, ListType.OWNEDLIST);
    }
  }

updateWishlist(event: MouseEvent, game: Game) {
    event.stopPropagation();

    if (this.wishListGames[game.id]) {
        this.localStorageService.deleteGame(game, ListType.WISHLIST);
    } else {
        if (this.ownedGames[game.id]) {
            this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
        }
        this.localStorageService.saveGame(game, ListType.WISHLIST);
    }
  }
}
