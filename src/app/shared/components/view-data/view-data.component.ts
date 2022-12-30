import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import * as Type from '../../type/main.type';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  
  dashboardData: any;

  selectedMood: Type.MoodType;
  selectedTopPick: Array<Type.TopPickSubType>;
  selectedToPickID: number;
  selectedTrending: Type.TrendingType;
  constructor( private _mainService$: MainService,     public _commonService$: CommonService    ) { }

  ngOnInit(): void {
    this.getDashboardItem();
  }
  getDashboardItem() {
    this._mainService$.getDashboard().subscribe({
      next: (res) => {
        if (res && res.body) {
          this.dashboardData = { ...res.body };
          // This called because set mood type to 'all' when this page loads.
          this.autoSelectAllMoodType();
          this.selectedTrending = this.dashboardData.trending[0];
          // This called because set Top pick type to 'artist' when this page loads.
          this.selectTopPick(this.topPickList.artist, 1);
          console.log(this.dashboardData);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  get topPickList() {
    return this.dashboardData.topPicks;
  }

  selectMood(moodObj: Type.MoodType) {
    this.selectedMood = moodObj;
  }

  autoSelectAllMoodType() {
    (this.dashboardData.moodList as []).filter((ele: Type.MoodType) => {
      if (ele && ele.id === 'all') {
        this.selectMood(ele);
      }
    });
  }

  selectTopPick(topPick: Array<Type.TopPickSubType>, topPickID: number) {
    this.selectedTopPick = topPick;
    this.selectedToPickID = topPickID;
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
}
