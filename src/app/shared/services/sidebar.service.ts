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

  rootLevelNodes: string[] = ['Mood List'];
  moodList: Type.MoodType[];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    this._mainService$.getDashboard().subscribe({
      next: (data) => {
        if (data && data.status === 200 && data.body && data.body.moodList) {
          this.moodList = data.body.moodList;
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

  getChildren(node: any): Type.MoodType[] | undefined {
    return this.moodList;
    // return this.dataMap.get(node);
  }

  goToMoodSongList(node: DynamicFlatNode) {
    let selectedMood = this.moodList.find((ele) => ele.title === node.item);
    this._commonService$.viewDataCompSongList = selectedMood.songs;
    this._commonService$.listTitle = selectedMood.title;
    this._router$.navigate(['main/viewData']);
  }

  isExpandable(node: string): boolean {
    return false;
    // return this.dataMap.has(node);
  }
}
