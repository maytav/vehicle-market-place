import {Injectable, Injector} from '@angular/core';
import {BaseSearchService} from '@app/shared/services/base-search.service';
import {BrandModel} from '@app/brand-models/models';

@Injectable()
export class BrandModelsService extends BaseSearchService<BrandModel> {

  constructor(injector: Injector) {
    super(injector)
  }
}
