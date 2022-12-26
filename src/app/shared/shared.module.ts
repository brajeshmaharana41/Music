import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MaterialModule} from './material/material.module'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    //MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports:[
    
  ]
})
export class SharedModule { }
