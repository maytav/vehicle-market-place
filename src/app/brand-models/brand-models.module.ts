import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BrandModelsRoutingModule} from './brand-models-routing.module';
import {BrandModelsComponent} from '@app/brand-models/components/brand-models/brand-models.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BrandModelsService} from '@app/brand-models/services/brand-models.service';
import {NgxsModule} from '@ngxs/store';
import {BrandModelsState} from '@app/brand-models/stores/brand-models.state';

@NgModule({
  declarations: [
    BrandModelsComponent
  ],
  imports: [
    CommonModule,
    BrandModelsRoutingModule,
    NgxsModule.forFeature([BrandModelsState]),
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage,

  ],
  providers: [BrandModelsService]
})
export class brandModelsModule {
}
