import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {CarsComponent} from './components/cars/cars.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CarsService} from '@app/cars/services/cars.service';
import {NgxsModule} from '@ngxs/store';
import {CarsState} from '@app/cars/stores/cars.state';
import {CarsRoutingModule} from '@app/cars/cars-routing.module';
import {CurrencyModule} from '@app/shared/pipes/currency/currency.module';


@NgModule({
  declarations: [
    CarsComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NgxsModule.forFeature([CarsState]),
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage,
    CurrencyModule,

  ],
  providers: [CarsService]
})
export class CarsModule {
}
