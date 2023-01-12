import { Injectable } from '@angular/core';
import { Track } from 'ngx-audio-player';
import * as Type from '../type/main.type';
import * as CommonType from '../type/common-type';
import { HttpHandlerService } from './httphandler.service';
import { API } from '../common/api';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../common/constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  playList: Track[];
  viewPageDataChange = new Subject();
  userUpdated = new Subject();
  // viewDataCompSongList: Type.SongType[];
  // listTitle: string;
  constructor(
    private _httpService$: HttpHandlerService,
    private _router$: Router
  ) {
    // if (localStorage.getItem(Constants.LISTTITLE)) {
    //   // this.playList = JSON.parse(localStorage.getItem(Constants.PLAYLIST));
    //   this.viewDataCompSongList = JSON.parse(
    //     localStorage.getItem(Constants.VIEWDATASONGLIST)
    //   );
    //   this.listTitle = localStorage.getItem(Constants.LISTTITLE);
    // }
  }

  createPlayList(songs: Type.SongType[], i: number) {
    this.playList = songs.slice(i, i + 15).map((ele: Type.SongType) => {
      return {
        title: ele.title,
        link: ele.media_file,
        artist: ele.artist,
      };
    });
    localStorage.setItem(Constants.PLAYLIST, JSON.stringify(this.playList));
  }

  getSongs(
    params: CommonType.SearchSongParamType
  ): Observable<CommonType.SearchSongAPIResponseType> {
    return this._httpService$.get(API.Song.searchSong, {}, params);
  }

  getActorListAPI(): Observable<any> {
    return this._httpService$.get(API.Admin.actorList, {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2YwOGI3YTVkZmE5NmMyY2JkMTVhMiIsInVzZXJfdHlwZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBkaGFrYXJlY29yZC5jb20iLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2NzMzNjE3MDgsImV4cCI6MTY3NTk1MzcwOH0.gvpDSR4GO9i6dViJKCJoz6w8KCQhvwXMET7H87qvjW8',
    });
  }

  getArtistListAPI(): Observable<any> {
    return this._httpService$.get(API.Admin.artistList, {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2YwOGI3YTVkZmE5NmMyY2JkMTVhMiIsInVzZXJfdHlwZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBkaGFrYXJlY29yZC5jb20iLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2NzMzNjE3MDgsImV4cCI6MTY3NTk1MzcwOH0.gvpDSR4GO9i6dViJKCJoz6w8KCQhvwXMET7H87qvjW8',
    });
  }

  getSongsToViewPage(paramObj: CommonType.SearchSongParamType, title: string) {
    localStorage.setItem(Constants.VIEWPAGEPARAM, JSON.stringify(paramObj));
    localStorage.setItem(Constants.LISTTITLE, title);
    this.viewPageDataChange.next({ paramObj, title });
    this._router$.navigate(['main/viewData']);
  }

  storeSessionInfo(res: CommonType.HttResponseType) {
    localStorage.setItem(Constants.SESSIONTOKENSTRING, res.body.token);
    localStorage.setItem(
      Constants.LOGGEDINUSER,
      JSON.stringify(res.body.user_data)
    );
    localStorage.setItem(Constants.LOGGEDINUSERID, res.body.user_id);
  }

  goToViewSongList(songList: Type.SongType[], title: string) {
    // this.viewDataCompSongList = songList;
    // localStorage.setItem(Constants.VIEWDATASONGLIST, JSON.stringify(songList));
    // this.listTitle = title;
    // localStorage.setItem(Constants.LISTTITLE, title);
    // this._router$.navigate(['main/viewData']);
  }

  // goToSingerListPage(personList: Type.TopPickSubType[]) {
  //   this.personList = personList;
  //   localStorage.setItem(Constants.PERSONLIST, JSON.stringify(personList));
  //   this._router$.navigate(['main/viewData']);
  // }
}
