import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [10, 20, 30];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  msaapAutoPlay = true;
  msaapExpanded = false;

  // Material Style Advance Audio Player Playlist
  // msaapPlaylist: Track[] = [
  //   {
  //     title: 'Amar Naker Ful Bole',
  //     link: 'http://3.111.212.219:3002/uploads/songs/9684244_Amar_Naker_Ful_Bole.mp3',
  //     artist: 'Audio One Artist',
  //     duration: 150,
  //   },
  //   {
  //     title: 'Bajare Jachai Kore',
  //     link: 'http://3.111.212.219:3002/uploads/songs/2434178_Bajare_Jachai_Kore.mp3',
  //     artist: 'Audio Two Artist',
  //     duration: 150,
  //   },
  //   {
  //     title: 'Audio Three Title',
  //     link: 'http://3.111.212.219:3002/uploads/songs/89804_Bhalo_Achi_Bhalo_Theko.mp3',
  //     artist: 'Audio Three Artist',
  //     duration: 150,
  //   },
  // ];
  constructor(public _commonService$: CommonService) {}

  ngOnInit(): void {}

  onEnded($event: any) {
    console.log('song ended', $event);
  }
}
