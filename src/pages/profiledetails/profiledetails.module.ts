import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiledetailsPage } from './profiledetails';

@NgModule({
  declarations: [
    ProfiledetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiledetailsPage),
  ],
})
export class ProfiledetailsPageModule {}
