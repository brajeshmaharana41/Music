import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constant';
import { CommonService } from '../../services/common.service';
import * as CommonType from '../../type/common-type';
import * as AuthType from '../../type/auth-type';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.scss'],
})
export class SingerListComponent implements OnInit {
  personList: CommonType.TopPickPerson[];
  listType: Constants.ACTOR | Constants.ARTIST;
  constructor(
    public _commonService$: CommonService,
    public _sidebarService$: SidebarService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listType = this.route.snapshot.params['listType'];
    this.selectListCall(this.listType);
    this._sidebarService$.topPickChange.subscribe({
      next: (res: Constants.ACTOR | Constants.ARTIST) => {
        this.listType = res;
        this.selectListCall(this.listType);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  selectListCall(listType: Constants.ACTOR | Constants.ARTIST) {
    if (listType === Constants.ACTOR) {
      this.getActorList();
    } else {
      this.getArtistList();
    }
  }

  getActorList() {
    this._commonService$.getActorListAPI().subscribe({
      next: (res: CommonType.HttResponseType) => {
        this.personList = res.body;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  getArtistList() {
    this._commonService$.getArtistListAPI().subscribe({
      next: (res: CommonType.HttResponseType) => {
        this.personList = res.body;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  goToSongViewPage(person: CommonType.TopPickPerson) {
    this._commonService$.getSongsToViewPage(
      { [this.listType.toLowerCase()]: person.id },
      person.title
    );
  }
}
