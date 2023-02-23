import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss'],
})
export class TermsAndConditionComponent implements OnInit {
  termsAndCondition: string;
  constructor(private _sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.termsAndCondition = this._sidebarService.cmsData.map((ele: any) => {
      if (ele.slug === 'terms-condition') {
        return ele.content;
      }
    })[0];
  }
}
