import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ModelDetailsRoutingModule} from '@app/model-details/model-details-routing.module';
import {ModelDetailsComponent} from './components/model-details/model-details.component';
import {MatCardModule} from '@angular/material/card';
import {SharedDirectivesModule} from '@app/shared/directives/shared-directives.module';
import {MatButtonModule} from '@angular/material/button';
import {CarDetailsModule} from '@app/car-details/car-details.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    ModelDetailsComponent
  ],
  imports: [
    CommonModule,
    ModelDetailsRoutingModule,
    MatCardModule,
    SharedDirectivesModule,
    CarDetailsModule,
    NgOptimizedImage,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ModelDetailsModule {
}
