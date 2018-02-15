import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddprofilePage } from './addprofile';

@NgModule({
  declarations: [
    AddprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(AddprofilePage),
  ],
})
export class AddprofilePageModule {}
