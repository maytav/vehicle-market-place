import {Brands} from '../models';
import {State} from '@ngxs/store';
import {Injectable, Injector} from '@angular/core';
import {brandsService} from '@app/brands/services/brands.service';
import {defaultListState, ListState, ListStateModel} from '@app/shared/stores/list.state';
import {Decorate} from '@app/shared/decorators/decorate.decorator';
import {StateCtx} from '@app/shared/stores/models/state-ctx';
import {BrandsActions} from '@app/brands/stores/brands.actions';


interface BrandsStateModel extends ListStateModel {
  brands: Brands[];
}


@State<BrandsStateModel>({
  name: 'brands',
  defaults: {...defaultListState(), brands: []},
})

@Injectable()
@Decorate<StateCtx>({actions: BrandsActions, service: brandsService})
export class BrandsState extends ListState {

  override service: brandsService

  constructor(injector: Injector) {
    super(injector)
  }

}

