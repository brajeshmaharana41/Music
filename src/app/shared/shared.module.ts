import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MaterialModule} from './material/material.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [AudioPlayerComponent ],
  imports: [
    CommonModule,
    //MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxAudioPlayerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [AudioPlayerComponent],
})
export class SharedModule {}
