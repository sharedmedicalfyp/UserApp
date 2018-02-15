import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilyProfilePage } from './family-profile';

@NgModule({
  declarations: [
    FamilyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(FamilyProfilePage),
  ],
})
export class FamilyProfilePageModule {}
