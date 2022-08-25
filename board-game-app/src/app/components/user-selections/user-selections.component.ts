import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ListType } from 'src/app/enums/list-type';
import { Game } from 'src/app/interfaces/game';
import * as _ from 'lodash';
import { Subject, tap, takeUntil } from 'rxjs';
import { Dictionary } from 'lodash';

@Component({
  selector: 'app-user-selections',
  templateUrl: './user-selections.component.html',
  styleUrls: ['./user-selections.component.scss']
})
export class UserSelectionsComponent implements OnInit {
  unsubscribe = new Subject<void>();

  listType: ListType;
  listTypeTitle: string;
  ownedGames: Game[];
  wishListGames: Game[];

  dataSource;
  displayedColumns = ['name', 'image', 'min_age', 'min_players', 'max_players', 'min_playtime', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.listType = this.route.snapshot.routeConfig.path === 'owned' ? ListType.OWNEDLIST : ListType.WISHLIST;
    this.listTypeTitle = this.listType === ListType.OWNEDLIST ? 'Owned Games' : 'Wishlist Games';

    if (this.listType === ListType.OWNEDLIST) {
      this.localStorageService.getGameList(ListType.OWNEDLIST);
      this.localStorageService.ownedGames.pipe(
          takeUntil(this.unsubscribe),
          tap(games => {
              this.ownedGames = games;
              this.dataSource = this.ownedGames;
          })
      ).subscribe();
  } else {
      this.localStorageService.getGameList(ListType.WISHLIST);
      this.localStorageService.wishListGames.pipe(
          takeUntil(this.unsubscribe),
          tap(games => {
              this.wishListGames = games;
              this.dataSource = this.wishListGames;
          })
      ).subscribe();
    }
  }

  deleteGame(game: Game) {
    if (this.listType === ListType.OWNEDLIST) {
        this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
    } else {
        this.localStorageService.deleteGame(game, ListType.WISHLIST);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
