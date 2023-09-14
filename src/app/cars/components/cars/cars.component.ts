import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Car, CarFilter} from '../../models';
import {Decorate} from '@app/shared/decorators/decorate.decorator';
import {ContainerContext} from '@app/shared/stores/models/container-context';
import {CarsActions} from '@app/cars/stores/cars.actions';
import {CarsState} from '@app/cars/stores/cars.state';
import {ListContainerMixin} from '@app/shared/containers/list-container.mixin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
@Decorate<ContainerContext>({actions: CarsActions, stateClass: CarsState})
export class CarsComponent extends ListContainerMixin<Car, CarFilter>() implements OnInit {

  brand = '';
  model = '';
  override items$: Observable<Car[]>
  imageUrl = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3.png'


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.brand = params['brand'];
      this.model = params['model'];
    });
  }

  protected override getFilter(): any {
    return {...super.getFilter(), model: this.route.snapshot.params['model']};
  }
}
