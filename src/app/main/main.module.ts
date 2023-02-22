import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SingersComponent } from '../shared/components/singers/singers.component';
import { PlaylistContentComponent } from '../shared/components/playlist-content/playlist-content.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { ViewDataComponent } from '../shared/components/view-data/view-data.component';
import { MatTreeModule } from '@angular/material/tree';
import { SingerListComponent } from '../shared/components/singer-list/singer-list.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { SearchDataComponent } from '../shared/components/search-data/search-data.component';
import { AboutUsComponent } from '../about/about-us/about-us.component';
import { TermsAndConditionComponent } from '../about/terms-and-condition/terms-and-condition.component';
import { PrivacyAndPolicyComponent } from '../about/privacy-and-policy/privacy-and-policy.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    SingersComponent,
    PlaylistContentComponent,
    FooterComponent,
    ViewDataComponent,
    SearchDataComponent,
    SingerListComponent,
    ProfileUpdateComponent,
    AboutUsComponent, 
    TermsAndConditionComponent, 
    PrivacyAndPolicyComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MainRoutingModule,
    NgbAlertModule,
    NgbPaginationModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,

    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
