import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

/**
 * Generated class for the FaqPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  information: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    let localData = http.get('assets/faq.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

   toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  // <ion-list class="accordion-list">
  //       <!-- First Level -->
  //       <ion-list-header *ngFor="let item of information; let i = index" no-lines no-padding>
  //           <!-- Toggle Button -->
  //           <button ion-item (click)="toggleSection(i)" detail-none [ngClass]="{'section-active': item.open, 'section': !item.open}">
  //       <ion-icon item-left name="arrow-forward" *ngIf="!item.open"></ion-icon>
  //       <ion-icon item-left name="arrow-down" *ngIf="item.open"></ion-icon>
  //         {{ item.name }}
  //     </button>

  //           <ion-list *ngIf="item.children && item.open" no-lines>
  //               <!-- Second Level -->
  //               <ion-list-header *ngFor="let child of item.children; let j = index" no-padding>
  //                   <!-- Toggle Button -->
  //                   <button ion-item (click)="toggleItem(i, j)" *ngIf="child.children" class="child" detail-none>
  //           <ion-icon item-left name="add" *ngIf="!child.open"></ion-icon>
  //           <ion-icon item-left name="close" *ngIf="child.open"></ion-icon>
  //           {{ child.name }}
  //         </button>

  //                   <!-- Direct Add Button as Fallback -->
  //                   <ion-item *ngIf="!child.children" ion-item detail-none class="child-item" text-wrap>
  //                       <h2>{{ child.name }}</h2>
  //                       <p text-lowercase>{{ child.information }}</p>
  //                       <button ion-button outline item-end (click)="buyItem(child)">{{ child.price }}</button>
  //                   </ion-item>

  //                   <ion-list *ngIf="child.children && child.open">
  //                       <!-- Third Level -->
  //                       <ion-item *ngFor="let item of child.children; let k = index" detail-none class="child-item" text-wrap>
  //                           <h2>{{ item.name }}</h2>
  //                           <p text-lowercase>{{ item.information }}</p>
  //                           <!-- Direct Add Button -->
  //                           <button ion-button outline item-end (click)="buyItem(item)">{{ item.price }}</button>
  //                       </ion-item>
  //                   </ion-list>

  //               </ion-list-header>
  //           </ion-list>

  //       </ion-list-header>
  //   </ion-list>

}
