import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.scss']
})
export class SingerListComponent implements OnInit {

  constructor(public _commonService$: CommonService) { }

  ngOnInit(): void {
  }

}
