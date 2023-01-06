import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import * as Type from '../../shared/type/main.type';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService } from '../main.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

export interface User {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _mainService$: MainService,
    public _commonService$: CommonService,
    public _router$: Router
  ) {}
  myControl = new FormControl<string | User>('');
  options: User[] = [{ name: 'Play List For You' }, { name: 'Categories' }, { name: 'Podcast' }];
  filteredOptions: Observable<User[]>;
  dashboardData: any;
  playlistTitle = [];
  playlist = [];
  selectedMood: Type.MoodType;
  selectedTopPick: Array<Type.TopPickSubType>;
  selectedToPickID: number;
  selectedTrending: Type.TrendingType;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

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

  goToViewAll(songList: Type.SongType[], listTitle: string) {
    this._commonService$.viewDataCompSongList = songList;
    this._commonService$.listTitle = listTitle;
    this._router$.navigate(['selectedUser/main/viewData']);
  }

  selectTopPick(topPick: Array<Type.TopPickSubType>, topPickID: number) {
    this.selectedTopPick = topPick;
    this.selectedToPickID = topPickID;
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
