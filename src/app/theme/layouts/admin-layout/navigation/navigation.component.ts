// Angular import
import { Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import

import { NavContentComponent } from './nav-content/nav-content.component';
import { NavigationItem } from './navigation';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [NavContentComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  navigationItems: NavigationItem[] = [];

  // media 1025 After Use Menu Open
  NavCollapsedMob = output();

  navCollapsedMob;
  windowWidth: number;

  // Constructor
  constructor(private navigationService: NavigationService) {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  ngOnInit(): void {
    this.navigationItems = this.navigationService.getNavigationItems();
  }

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
