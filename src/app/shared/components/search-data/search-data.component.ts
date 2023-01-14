import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
export interface User {
  name: string;
}

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit {
  myControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]>;
  options: User[] = [
    { name: 'Play List For You' },
    { name: 'Categories' },
    { name: 'Podcast' },
  ];
  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
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
