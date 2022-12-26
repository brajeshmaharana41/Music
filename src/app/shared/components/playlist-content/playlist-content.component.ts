import { Component, Input, OnInit } from '@angular/core';

// export interface PlaylitList {
// description:string,
// id:string,
// img:string,
// title:string
// }

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrls: ['./playlist-content.component.scss']
})
export class PlaylistContentComponent implements OnInit {
  // @Input() playListID:number;
  @Input() playlistdata : any;

  constructor() { }

  ngOnInit(): void {
  }

}
