import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
  Generated class for the SplitPaneProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SplitPane {

  public splitPaneState: Boolean;

  constructor(public platform: Platform) {
    console.log('Hello SplitPane Provider');
    this.splitPaneState = false;
  }

  getSplitPane(){
    if(localStorage.getItem('userData')){
      if(this.platform.width() > 850 ){
         this.splitPaneState = true;
      }else{
        this.splitPaneState = false;
      }
    }else{
      this.splitPaneState = false;
    }
    return this.splitPaneState;
  }

}
