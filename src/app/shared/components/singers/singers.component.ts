import { Component, Input, OnInit } from '@angular/core';

// export interface SingerList {
//   image: string;
//   names: string;
// }
@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss']
})
export class SingersComponent implements OnInit {
  @Input() artistData : any;

  constructor() { }

  ngOnInit(): void {
  }

}
