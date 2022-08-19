import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { ListType } from 'src/app/enums/list-type';

@Component({
  selector: 'app-game-detail-controls',
  templateUrl: './game-detail-controls.component.html',
  styleUrls: ['./game-detail-controls.component.scss']
})
export class GameDetailControlsComponent implements OnInit {
  @Input() game: Game;
  @Input() ownedGames: { [id: string]: Game } = {};
  @Input() wishListGames: { [id: string]: Game } = {};
  
  @Output() changedGameStatus = new EventEmitter<ListType>();
  
  constructor() { }
  
  ngOnInit(): void { }
  
  addToOwned() {
      this.changedGameStatus.emit(ListType.OWNEDLIST);
  }
  
  addToWishlist() {
      this.changedGameStatus.emit(ListType.WISHLIST);
  }

}
