import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'brands',
  },
  {
    path: 'brands',
    loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule),
  },
  {
    path: 'brands/:brand',
    loadChildren: () => import('@app/brand-models/brand-models.module').then(m => m.brandModelsModule),
  },
  {
    path: 'brands/:brand/:model',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule),
  },
  {
    path: 'brands/:brand/:model/details',
    loadChildren: () => import('./model-details/model-details.module').then(m => m.ModelDetailsModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
