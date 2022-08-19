import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSearchComponent } from '../components/game-search/game-search.component';
import { UserSelectionsComponent } from '../components/user-selections/user-selections.component';
import { GameDetailsComponent } from '../components/game-details/game-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: GameSearchComponent },
  { path: 'owned', component: UserSelectionsComponent },
  { path: 'wishlist', component: UserSelectionsComponent },
  { path: 'game-details', component: GameDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
