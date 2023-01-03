import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import * as Type from '../../type/main.type';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
})
export class ViewDataComponent implements OnInit {
  
  constructor(
    private _mainService$: MainService,
    public _commonService$: CommonService
  ) {}

  ngOnInit(): void {
  }
 }
