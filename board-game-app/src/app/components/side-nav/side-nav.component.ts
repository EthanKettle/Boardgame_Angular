import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
        name: 'Search',
        route: '/search',
        icon: 'search'
    },
    {
        name: 'Owned',
        route: '/owned',
        icon: 'verified_outlined',
    },
    {
        name: 'Wishlist',
        route: '/wishlist',
        icon: 'switch_access_shortcut'
    },
];

  constructor() { }

  ngOnInit(): void {
  }

}
