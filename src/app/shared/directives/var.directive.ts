import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';


@Directive({
  selector: '[appVar]',
})
export class VarDirective {
  private context = {appVar: null};

  constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<{ appVar: any }>) {
    _viewContainer.createEmbeddedView(_templateRef, this.context);
  }

  @Input()
  set appVar(value: any) {
    this.context.appVar = value;
  }
}
