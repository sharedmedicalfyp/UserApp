import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarpoolPage } from './carpool';

@NgModule({
  declarations: [
    CarpoolPage,
  ],
  imports: [
    IonicPageModule.forChild(CarpoolPage),
  ],
})
export class CarpoolPageModule {}
