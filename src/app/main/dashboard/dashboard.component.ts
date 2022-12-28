import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import * as Type from '../../shared/type/main.type';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService } from '../main.service';
import { CommonService } from 'src/app/shared/services/common.service';

export interface User {
  name: string;
}
export interface SingerList {
  image: string;
  names: string;
}
export interface PlaylitList {
  image: string;
  names: string;
  songs: string;
}
export interface SongList {
  band_image: string;
  band_names: string;
  song_name: string;
}
export interface BandList {
  band_title: string;
  song_Data: SongList[];
}
const BandData: BandList[] = [
  {
    band_title: 'Rock Band',
    song_Data: [
      {
        band_image: '../../../assets/Band0.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band1.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band2.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band3.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
    ],
  },
  {
    band_title: 'Bangla Folk',
    song_Data: [
      {
        band_image: '../../../assets/Band4.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band5.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band6.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band7.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
    ],
  },
  {
    band_title: 'Bangla Folk',
    song_Data: [
      {
        band_image: '../../../assets/Band4.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band5.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band6.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
      {
        band_image: '../../../assets/Band7.png',
        band_names: 'Running up that Hill (A Deal with the god)',
        song_name: 'Kate Bush',
      },
    ],
  },
];
const SingerData: SingerList[] = [
  {
    image: '../../../assets/Frame 12.png',
    names: 'Ayub Bacchu',
  },
  {
    image: '../../../assets/Frame 13.png',
    names: 'Subir Nandi',
  },
  {
    image: '../../../assets/Frame 14.png',
    names: 'Nancy',
  },
  {
    image: '../../../assets/Frame 15.png',
    names: 'Runa Laila',
  },
  {
    image: '../../../assets/Frame 15.png',
    names: 'Runa Laila',
  },
  {
    image: '../../../assets/Frame 12.png',
    names: 'Arijit',
  },
  {
    image: '../../../assets/Frame 12.png',
    names: 'Arijit',
  },
  {
    image: '../../../assets/Frame 12.png',
    names: 'Arijit',
  },
  {
    image: '../../../assets/Frame 12.png',
    names: 'Arijit',
  },
  {
    image: '../../../assets/Frame 12.png',
    names: 'Arijit',
  },
  {
    image: '../../../assets/Frame 12.png',
    names: 'Arijit',
  },
];
const PlaylistData: PlaylitList[] = [
  {
    image: '../../../assets/Playlist 1.png',
    names: 'Minar all song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 2.png',
    names: 'Best Rock song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 3.png',
    names: 'Artcell',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 2.png',
    names: 'Best Rock song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 3.png',
    names: 'Artcell',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 2.png',
    names: 'Best Rock song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 4.png',
    names: 'Miles',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 1.png',
    names: 'Minar all song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 2.png',
    names: 'Best Rock song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 1.png',
    names: 'Minar all song',
    songs: '12 songs',
  },
  {
    image: '../../../assets/Playlist 3.png',
    names: 'Artcell',
    songs: '12 songs',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _mainService$: MainService,
    public _commonService$: CommonService
  ) {}
  myControl = new FormControl<string | User>('');
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions: Observable<User[]>;
  artists = SingerData;
  playlistSongs = PlaylistData;
  band_songs = BandData;
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

  selectTopPick(topPick: Array<Type.TopPickSubType>, topPickID: number) {
    this.selectedTopPick = topPick;
    this.selectedToPickID = topPickID;
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  // mapMoodListSongs(songs: Type.SongType[], i: number) {
  //   this._commonService$.playList = songs
  //     .slice(i)
  //     .map((ele: Type.SongType) => {
  //       return {
  //         title: ele.title,
  //         link: ele.media_file,
  //         artist: ele.artist,
  //       };
  //     });
  // }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
