import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  aboutUs: string;
  constructor(private _sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.aboutUs = this._sidebarService.cmsData.map((ele) => {
      if (ele.slug === 'about-us') {
        return ele.content;
      }
    })[0];
  }
}
