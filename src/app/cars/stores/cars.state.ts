import {State} from '@ngxs/store';
import {Injectable, Injector} from '@angular/core';
import {defaultListState, ListState} from '@app/shared/stores/list.state';
import {Decorate} from '@app/shared/decorators/decorate.decorator';
import {StateCtx} from '@app/shared/stores/models/state-ctx';
import {CarsActions} from '@app/cars/stores/cars.actions';
import {CarsService} from '@app/cars/services/cars.service';


@State({
  name: 'cars',
  defaults: defaultListState(),
})

@Injectable()
@Decorate<StateCtx>({actions: CarsActions, service: CarsService})
export class CarsState extends ListState {


  constructor(injector: Injector) {
    super(injector)
  }

}

