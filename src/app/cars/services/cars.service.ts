import {Injectable, Injector} from '@angular/core';
import {BaseSearchService} from '@app/shared/services/base-search.service';
import {Car} from '@app/cars/models';

@Injectable()
export class CarsService extends BaseSearchService<Car> {

  constructor(injector: Injector) {
    super(injector)
  }
}
