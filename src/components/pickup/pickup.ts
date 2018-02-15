import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupDirective {

  text: string;

  constructor() {
    console.log('Hello PickupComponent Component');
    this.text = 'Hello World';
  }

}
