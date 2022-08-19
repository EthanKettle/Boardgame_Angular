import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/interfaces/game';
import { switchMap,tap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ListType } from 'src/app/enums/list-type';
import * as _ from 'lodash';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: Game | undefined;
  ownedGames: {[id: string]: Game} = {};
  wishListGames: {[id: string]: Game} = {};

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
          return this.gameService.getById(params['gameId'])
      }),
      tap(game => this.game = game[0])
    ).subscribe();

    this.localStorageService.getGameList(ListType.OWNEDLIST);
    this.localStorageService.getGameList(ListType.WISHLIST);

    this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
    this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
  }

  setGameList(listType: ListType) {
    if (listType === ListType.OWNEDLIST) {
        if (this.ownedGames[this.game.id]) {
            this.localStorageService.deleteGame(this.game, ListType.OWNEDLIST);
        } else {
            if (this.wishListGames[this.game.id]) {
                this.localStorageService.deleteGame(this.game, ListType.WISHLIST);
            }
            this.localStorageService.saveGame(this.game, ListType.OWNEDLIST);
        }
    } else {
        if (this.wishListGames[this.game.id]) {
            this.localStorageService.deleteGame(this.game, ListType.WISHLIST);
        } else {
            if (this.ownedGames[this.game.id]) {
                this.localStorageService.deleteGame(this.game, ListType.OWNEDLIST);
            }
            this.localStorageService.saveGame(this.game, ListType.WISHLIST);
        }
    }
  }

}
