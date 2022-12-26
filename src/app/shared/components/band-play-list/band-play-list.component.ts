import { Component, Input, OnInit } from '@angular/core';

export interface SongList {
  band_image: string;
  band_names: string;
  song_name: string;
}
export interface BandList {
  band_title: string;
  song_Data: SongList[]
}

@Component({
  selector: 'app-band-play-list',
  templateUrl: './band-play-list.component.html',
  styleUrls: ['./band-play-list.component.scss']
})
export class BandPlayListComponent implements OnInit {
  @Input() songsdatas : BandList;
  constructor() { }

  ngOnInit(): void {
  }

}
