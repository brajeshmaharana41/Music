import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main/main.service';
import * as Type from '../type/main.type';
import { CommonService } from './common.service';
export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(
    public _mainService$: MainService,
    public _commonService$: CommonService,
    public _router$: Router
  ) {}
  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);

  rootLevelNodes: string[] = [
    'Mood List',
    'Play List For You',
    'Categories',
    'Top Picks',
    'Podcast',
  ];
  dashBoardData: any;

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    this._mainService$.getDashboard().subscribe({
      next: (data) => {
        if (data && data.status === 200 && data.body && data.body.moodList) {
          this.dashBoardData = data.body;
        }
        console.log(data);
        // console.log(data);
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
    return this.rootLevelNodes.map(
      (moodObj) => new DynamicFlatNode(moodObj, 0, true)
    );
  }

  getChildren(node: DynamicFlatNode): any[] | undefined {
    switch (node.item) {
      case 'Play List For You':
        return this.dashBoardData.playListForYou;
      case 'Mood List':
        return this.dashBoardData.moodList;
      case 'Categories':
        return this.dashBoardData.categories;
      case 'Top Picks':
        return [{ title: 'Artist' }, { title: 'Actor' }];
      // return this.dashBoardData.topPicks;
      case 'Podcast':
        this.goToViewSongList(this.dashBoardData.podcast, 'Podcast');
        return undefined;
      default:
        return undefined;
    }
    // return this.dashBoardData.moodList;
    // return this.dataMap.get(node);
  }

  // hasChildren(node: DynamicFlatNode) {
  //   switch (node.item) {
  //     case 'Play List For You':
  //       return this.dashBoardData.playListForYou;
  //     case 'Mood List':
  //       return this.dashBoardData.moodList;
  //     case 'Categories':
  //       return this.dashBoardData.categories;
  //     case 'Top Picks':
  //       return this.dashBoardData.topPicks;
  //       case 'Podcast':
  //         return null;
  //   }
  // }

  getMoodSongList(node: DynamicFlatNode) {
    let selectedMood = this.dashBoardData.moodList.find(
      (ele) => ele.title === node.item
    );
    this.goToViewSongList(selectedMood.songs, selectedMood.title);
  }
  goToViewSongList(songList: Type.SongType[], title: string) {
    this._commonService$.viewDataCompSongList = songList;
    this._commonService$.listTitle = title;
    this._router$.navigate(['main/viewData']);
  }

  isExpandable(node: DynamicFlatNode): boolean {
    return !!this.getChildren(node);
    // return node.expandable;
    // return this.dataMap.has(node);
  }
}
