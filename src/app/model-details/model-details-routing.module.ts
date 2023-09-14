import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelDetailsComponent} from '@app/model-details/components/model-details/model-details.component';

const routes: Routes = [
  {path: '', component: ModelDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelDetailsRoutingModule {
}
