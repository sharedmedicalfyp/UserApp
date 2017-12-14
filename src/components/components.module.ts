import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { PickupComponent } from './pickup/pickup';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
	declarations: [MapComponent,
    PickupComponent,
    AccordionComponent],
	imports: [],
	exports: [MapComponent,
    PickupComponent,
    AccordionComponent]
})
export class ComponentsModule {}
