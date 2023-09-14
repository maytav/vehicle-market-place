import {State} from '@ngxs/store';
import {Injectable, Injector} from '@angular/core';
import {brandsService} from '@app/brands/services/brands.service';
import {defaultListState, ListState, ListStateModel} from '@app/shared/stores/list.state';
import {Decorate} from '@app/shared/decorators/decorate.decorator';
import {StateCtx} from '@app/shared/stores/models/state-ctx';
import {BrandModelsActions} from '@app/brand-models/stores/brand-models.actions';
import {BrandModelsService} from '@app/brand-models/services/brand-models.service';


interface BrandModelsStateModel extends ListStateModel {
}


@State<BrandModelsStateModel>({
  name: 'brandsModels',
  defaults: defaultListState(),
})

@Injectable()
@Decorate<StateCtx>({actions: BrandModelsActions, service: BrandModelsService})
export class BrandModelsState extends ListState {

  override service: brandsService

  constructor(injector: Injector) {
    super(injector)
  }

}

