import { Component, ViewChild, OnInit, Renderer } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  accordionExpanded = false;
  @ViewChild("cc") cardContent: any;

  constructor(public renderer: Renderer) {

  }
  
  // Execute when component has completely initialized
  ngOnInit(){   
    console.log(this.cardContent.nativeElement);

    // CSS Animation
    this.renderer.setElementStyle(this.cardContent.nativeElement,"webkitTransition", "max-height 500ms, padding 500ms");
  }

  toggleAccordion(){
    if(this.accordionExpanded){
      // Edit max height
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      // Reset padding to 0 px
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px"); // 0px = Vertical, 16px = Horizontal 
    } else{
      // Edit to 500px
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "18px 16px");

    }
    // Close the tab if opened
    this.accordionExpanded = !this.accordionExpanded;

  }

}
