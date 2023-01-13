import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import * as Type from '../../type/main.type';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { Constants } from '../../common/constant';
import * as CommonType from '../../type/common-type';

export interface User {
  name: string;
}

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
})
export class ViewDataComponent implements OnInit {
  paramObj: CommonType.SearchSongParamType;
  viewDataCompSongList: Type.SongType[];
  listTitle: string;
  constructor(
    private _mainService$: MainService,
    public _commonService$: CommonService
  ) {}

  ngOnInit(): void {
    // if (this.viewDataCompSongList) {
    //   console.log('here');
    //   //temp
    //   return; //temp
    // } //temp
    if (!localStorage.getItem('viewDataNew')) {
      // temp
      this.paramObj = JSON.parse(localStorage.getItem(Constants.VIEWPAGEPARAM));
      this.listTitle = localStorage.getItem(Constants.LISTTITLE);
      this.getViewPageData(this.paramObj);
    } // temp
    else {
      this.viewDataCompSongList = JSON.parse(
        // temp
        localStorage.getItem('viewDataNew') // temp
      ); // temp
      this.listTitle = localStorage.getItem(Constants.LISTTITLE); //temp
    }
    this._commonService$.viewPageDataChange.subscribe({
      next: (res: {
        paramObj: CommonType.SearchSongParamType | any;
        title: string;
      }) => {
        console.log(res);
        if (!localStorage.getItem('viewDataNew')) {
          // temp
          this.paramObj = res.paramObj;
          this.listTitle = res.title;
          this.getViewPageData(this.paramObj);
        } //temp
        else {
          // temp
          this.viewDataCompSongList = res.paramObj; //temp
          this.listTitle = res.title; // temp
        } //temp
      },
    });
  }

  getViewPageData(paramObj: CommonType.SearchSongParamType) {
    if (paramObj.mood && paramObj.mood.toLowerCase() === 'all') {
      paramObj.mood = '';
      paramObj.limit = 'all';
    }
    this._commonService$.getSongs(paramObj).subscribe({
      next: (res: CommonType.SearchSongAPIResponseType) => {
        if (res.status === Constants.SUCCESSSTATUSCODE) {
          this.viewDataCompSongList = res.body;
          // this.goToViewSongList(res.body, title);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }
}
