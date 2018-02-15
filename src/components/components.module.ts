import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { PickupDirective } from './pickup/pickup';
import { AccordionComponent } from './accordion/accordion';

@NgModule({
	declarations: [MapComponent,
    PickupDirective,
    AccordionComponent],
	imports: [],
	exports: [MapComponent,
    // PickupComponent,
    PickupDirective,
    AccordionComponent]
})
export class ComponentsModule {}
