import {Component, Injector} from '@angular/core';
import {ListContainerMixin} from '@app/shared/containers/list-container.mixin';
import {Decorate} from '@app/shared/decorators/decorate.decorator';
import {ContainerContext} from '@app/shared/stores/models/container-context';
import {CarsActions} from '@app/cars/stores/cars.actions';
import {CarsState} from '@app/cars/stores/cars.state';
import {filter, Observable, of} from 'rxjs';
import {Car} from '@app/cars/models';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {CarDetailsComponent} from '@app/car-details/components/car-details/car-details.component';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
@Decorate<ContainerContext>({actions: CarsActions, stateClass: CarsState})
export class ModelDetailsComponent extends ListContainerMixin() {

  override item$: Observable<Car>
  imageUrl = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3.png'

  constructor(injector: Injector, private route: ActivatedRoute, public dialog: MatDialog) {
    super(injector);
    this.items$.pipe(filter(data => !_.isEmpty(data))).subscribe((cars) => {
      this.onItemSelected(cars[0])
    })
  }

  override searchItems(): Observable<any> {

    if (_.isEmpty(this.store.selectSnapshot(CarsState.item))) {
      return super.searchItems();
    }
    return of()
  }

  getQuote() {
  }

  openFinanceOfferPopup() {
    this.dialog.open(CarDetailsComponent, {width: '620px'})
  }

  protected override getFilter(): any {
    return {...super.getFilter(), model: this.route.snapshot.params['model']};
  }
}
