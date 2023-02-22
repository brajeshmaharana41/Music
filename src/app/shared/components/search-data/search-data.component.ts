import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { CommonService } from '../../services/common.service';
import * as CommonType from '../../type/common-type';
import { SongType } from '../../type/main.type';
export interface User {
  name: string;
}

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss'],
})
export class SearchDataComponent implements OnInit {
  myControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]>;
  songList: SongType[];
  currentSearchString: string = '';
  options: User[] = [
    { name: 'Play List For You' },
    { name: 'Categories' },
    { name: 'Podcast' },
  ];
  constructor(
    private route: ActivatedRoute,
    public _commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

    this.route.queryParams.subscribe((params: any) => {
      // console.log(params); // { order: "popular" }
      if (params && params.term) {
        this.currentSearchString = params.term;
        this.myControl.setValue(this.currentSearchString);
        this.getSongsForSearch(params);
      }
      // this.order = params.order;
    });
  }

  search(term: string) {
    if (term) {
      this.currentSearchString = term;
      this.router.navigate(['main/searchData'], {
        queryParams: { term: this.currentSearchString },
      });
      this.getSongsForSearch({ term: this.currentSearchString });
    }
  }

  getSongsForSearch(paramObj: CommonType.SearchSongParamType) {
    this._commonService.getSongs(paramObj).subscribe({
      next: (res: CommonType.HttResponseType) => {
        this.songList = [...res.body];
      },
    });
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
