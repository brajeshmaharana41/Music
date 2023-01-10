import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Type from '../../shared/type/main.type';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService } from '../main.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import * as CommonType from '../../shared/type/common-type';
import { Constants } from 'src/app/shared/common/constant';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
export interface User {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myControl = new FormControl<string | User>('');
  options: User[] = [
    { name: 'Play List For You' },
    { name: 'Categories' },
    { name: 'Podcast' },
  ];
  filteredOptions: Observable<User[]>;
  dashboardData: any;
  playlistTitle = [];
  playlist = [];
  selectedMood: Type.MoodType;
  selectedTopPick: Array<Type.TopPickSubType>;
  selectedToPickID: number;
  selectedTrending: Type.TrendingType;
  constructor(
    private _mainService$: MainService,
    public _commonService$: CommonService,
    public _router$: Router,
    public _sidebarService$: SidebarService
  ) {}
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

  // goToViewAll(songList: Type.SongType[], listTitle: string) {
  //   this._commonService$.viewDataCompSongList = songList;
  //   this._commonService$.listTitle = listTitle;
  //   this._router$.navigate(['main/viewData']);
  // }

  // getSongs(paramObj: CommonType.SearchSongParamType, title: string) {
  //   this._commonService$.getSongs(paramObj).subscribe({
  //     next: (res: CommonType.SearchSongAPIResponseType) => {
  //       if (res.status === Constants.SUCCESSSTATUSCODE) {
  //         this._commonService$.goToViewSongList(res.body, title);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err.error);
  //     },
  //   });
  // }

  selectTopPick(topPick: Array<Type.TopPickSubType>, topPickID: number) {
    this.selectedTopPick = topPick;
    this.selectedToPickID = topPickID;
  }

  goToTopPickPage() {
    this._router$.navigate([
      `main/singerlist/${
        this.selectedToPickID === 1 ? Constants.ARTIST : Constants.ACTOR
      }`,
    ]);
    // setTimeout(() => {
    //   this._sidebarService$.topPickChange.next(
    //     this.selectedToPickID === 1 ? Constants.ARTIST : Constants.ACTOR
    //   );
    // }, 1000);
  }

  getTypeOfTopPick(selectedTopPickObj: any) {
    if (this.selectedToPickID === 1) {
      this._commonService$.getSongsToViewPage(
        { artist: selectedTopPickObj?.id },
        selectedTopPickObj?.title
      );
    } else {
      this._commonService$.getSongsToViewPage(
        { actor: selectedTopPickObj?.id },
        selectedTopPickObj?.title
      );
    }
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
