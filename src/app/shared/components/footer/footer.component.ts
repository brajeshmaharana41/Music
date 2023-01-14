import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  horizontal: boolean = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {}
  goToHomePage(){
    this._router.navigate(['main/home'])
  }
  goToSearchPage() {
    this._router.navigate(['main/searchData']);
  }
}
