import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarDetailsComponent} from './components/car-details/car-details.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {SharedDirectivesModule} from '@app/shared/directives/shared-directives.module';
import {MatInputModule} from '@angular/material/input';
import {CurrencyModule} from '@app/shared/pipes/currency/currency.module';


@NgModule({
  declarations: [
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    SharedDirectivesModule,
    MatInputModule,
    CurrencyModule
  ]
})
export class CarDetailsModule {
}
