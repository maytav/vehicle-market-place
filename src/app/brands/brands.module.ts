import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BrandsRoutingModule} from './brands-routing.module';
import {BrandsComponent} from '@app/brands/components/brands/brands.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgxsModule} from '@ngxs/store';
import {BrandsState} from '@app/brands/stores/brands.state';
import {brandsService} from '@app/brands/services/brands.service';
import {AspectRatioImageModule} from '@app/shared/components/aspect-ratio-image/aspect-ratio-image.module';


@NgModule({
    declarations: [
      BrandsComponent
    ],
    imports: [
        CommonModule,
      BrandsRoutingModule,
      NgxsModule.forFeature([BrandsState]),
        MatCardModule,
        MatButtonModule,
        NgOptimizedImage,
        AspectRatioImageModule,
    ],
  providers: [brandsService]
})
export class BrandsModule {
}
