import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPlayListComponent } from './band-play-list.component';

describe('BandPlayListComponent', () => {
  let component: BandPlayListComponent;
  let fixture: ComponentFixture<BandPlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandPlayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
