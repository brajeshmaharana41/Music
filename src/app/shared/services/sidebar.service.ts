import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main/main.service';
import * as Type from '../type/main.type';
import { CommonService } from './common.service';
import { Subject } from 'rxjs';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public id: string,
    public parentNode: any,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // selectedMood=new Subject<Type.MoodType>();
  // dataMap = new Map<string, string[]>([
  //   ['Fruits', ['Apple', 'Orange', 'Banana']],
  //   ['Vegetables', ['Tomato', 'Potato', 'Onion']],
  //   ['Apple', ['Fuji', 'Macintosh']],
  //   ['Onion', ['Yellow', 'White', 'Purple']],
  // ]);
  topPickChange = new Subject<string>();
  rootLevelNodes: string[] = [
    'Mood List',
    'Play List For You',
    'Categories',
    'Top Picks',
    'Podcast',
    'Newly Added',
  ];
  dashBoardData: any;
  constructor(
    public _mainService$: MainService,
    public _commonService$: CommonService,
    public _router$: Router
  ) {}
  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    this._mainService$.getDashboard().subscribe({
      next: (data) => {
        if (data && data.status === 200 && data.body && data.body.moodList) {
          this.dashBoardData = data.body;
        }
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
    return this.rootLevelNodes.map(
      (moodObj) => new DynamicFlatNode(moodObj, '1', 'null', 0, true)
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
        return [
          { title: 'Artist', id: 1 },
          { title: 'Actor', id: 2 },
        ];
      // return this.dashBoardData.topPicks;
      case 'Podcast':
        this._commonService$.goToViewSongList(
          this.dashBoardData.podcast,
          'Podcast'
        );
        return null;

      case 'Newly Added':
        this._commonService$.goToViewSongList(
          this.dashBoardData.newAdded,
          'Newly Added'
        );
        return null;
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
    // console.log('node', node);
    switch (node.parentNode) {
      case 'Play List For You':
        this._commonService$.getSongsToViewPage(
          { playlist: node.id },
          node.item
        );
        break;
      // return this.dashBoardData.playListForYou;
      case 'Mood List':
        this._commonService$.getSongsToViewPage({ mood: node.id }, node.item);
        break;
      case 'Categories':
        this._commonService$.getSongsToViewPage(
          { category: node.id },
          node.item
        );
        break;
      // return this.dashBoardData.categories;
      case 'Top Picks':
        this._router$.navigate([`main/singerlist/${node.item.toUpperCase()}`]);
        this.topPickChange.next(node.item.toUpperCase());
        // return this.dashBoardData.topPicks;
        break;
      case 'Podcast':
        // this._commonService$.goToViewSongList(
        //   this.dashBoardData.podcast,
        //   'Podcast'
        // );
        break;
      default:
        return undefined;
    }
  }

  isExpandable(node: DynamicFlatNode): boolean {
    return !!this.getChildren(node);
    // return node.expandable;
    // return this.dataMap.has(node);
  }
}
