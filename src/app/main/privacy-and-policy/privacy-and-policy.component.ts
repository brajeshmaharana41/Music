import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-privacy-and-policy',
  templateUrl: './privacy-and-policy.component.html',
  styleUrls: ['./privacy-and-policy.component.scss'],
})
export class PrivacyAndPolicyComponent implements OnInit {
  privacyAndPolicy: string;
  constructor(private _sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.privacyAndPolicy = this._sidebarService.cmsData.map((ele: any) => {
      if (ele.slug === 'privacy-policy') {
        return ele.content;
      }
    })[0];
  }
}
