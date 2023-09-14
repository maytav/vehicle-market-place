import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VarDirective} from '@app/shared/directives/var.directive';

@NgModule({
  declarations: [VarDirective],
  exports: [VarDirective],
  imports: [
    CommonModule,
  ],
})
export class SharedDirectivesModule {
}
