import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrandModelsComponent} from '@app/brand-models/components/brand-models/brand-models.component';

const routes: Routes = [
  {path: '', component: BrandModelsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandModelsRoutingModule {
}
