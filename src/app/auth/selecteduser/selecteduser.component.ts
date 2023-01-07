import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecteduser',
  templateUrl: './selecteduser.component.html',
  styleUrls: ['./selecteduser.component.scss'],
})
export class SelecteduserComponent implements OnInit {
  constructor(private _router$: Router) {}

  ngOnInit(): void {}

  goToLogin() {
    this._router$.navigate(['auth/login']);
  }
}
