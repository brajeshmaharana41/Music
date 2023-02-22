import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AboutUsComponent } from './about-us/about-us.component';
// import { PrivacyAndPolicyComponent } from './privacy-and-policy/privacy-and-policy.component';
// import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [
    // AboutUsComponent,
    // PrivacyAndPolicyComponent,
    // TermsAndConditionComponent,
  ],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
