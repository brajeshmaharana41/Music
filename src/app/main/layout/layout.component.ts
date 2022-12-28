import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sideBarOpen = true;

  constructor(public _commonService$: CommonService) {}

  ngOnInit(): void {}

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
