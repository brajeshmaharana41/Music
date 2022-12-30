import { Injectable } from '@angular/core';
import { Track } from 'ngx-audio-player';
import * as Type from '../type/main.type';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  playList: Track[];
  viewDataCompSongList: Type.SongType[];
  listTitle: string;
  constructor() {}
  createPlayList(songs: Type.SongType[], i: number) {
    this.playList = songs.slice(i).map((ele: Type.SongType) => {
      return {
        title: ele.title,
        link: ele.media_file,
        artist: ele.artist,
      };
    });
  }
}
