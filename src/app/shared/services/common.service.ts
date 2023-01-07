import { Injectable } from '@angular/core';
import { Track } from 'ngx-audio-player';
import * as Type from '../type/main.type';
import * as CommonType from '../type/common-type';
import { HttpHandlerService } from './httphandler.service';
import { API } from '../common/api';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../common/constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  playList: Track[];
  viewDataCompSongList: Type.SongType[];
  listTitle: string;
  constructor(
    private _httpService$: HttpHandlerService,
    private _router$: Router
  ) {
    if (localStorage.getItem(Constants.LISTTITLE)) {
      this.playList = JSON.parse(localStorage.getItem(Constants.PLAYLIST));
      this.viewDataCompSongList = JSON.parse(
        localStorage.getItem(Constants.VIEWDATASONGLIST)
      );
      this.listTitle = localStorage.getItem(Constants.LISTTITLE);
    }
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

  goToViewSongList(songList: Type.SongType[], title: string) {
    this.viewDataCompSongList = songList;
    localStorage.setItem(Constants.VIEWDATASONGLIST, JSON.stringify(songList));
    this.listTitle = title;
    localStorage.setItem(Constants.LISTTITLE, title);
    this._router$.navigate(['main/viewData']);
  }
}
