import {Injectable, Injector} from '@angular/core';
import {Brands} from '@app/brands/models';
import {BaseSearchService} from '@app/shared/services/base-search.service';

@Injectable()
export class brandsService extends BaseSearchService<Brands> {

  constructor(injector: Injector) {
    super(injector)
  }

}
