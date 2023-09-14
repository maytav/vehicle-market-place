import {BaseSearchService} from '@app/shared/services/base-search.service';
import {ListActions} from '@app/shared/stores/list.actions';
import {Injector} from '@angular/core';
import {InheritedSelector} from '@app/shared/decorators/inherit-selectors.decorator';

import {Action, StateContext, Store} from '@ngxs/store';
import {Decorate, getClassContext} from '@app/shared/decorators/decorate.decorator';
import {PayloadAction} from '@app/shared/stores/models/payload.action';
import {tap} from 'rxjs';

export interface ListStateModel<ListItemType = any, FilterType = ListItemType> {
  query: FilterType;
  items: ListItemType[];
  item: ListItemType;
}

export const defaultListState = () => ({
    query: {},
    items: [],
    item: {},
  }
);

export class ListState<ListItemType = any, FilterType = ListItemType> {
  protected service: BaseSearchService<ListItemType, FilterType, any>;
  protected actions: ListActions<FilterType>;
  protected store: Store;


  constructor(injector: Injector) {
    const context = getClassContext(this);
    this.actions = context.actions;
    this.store = injector.get(Store);
    if (context.service) {
      this.service = injector.get<any>(context.service, null);
    }
  }

  @InheritedSelector()
  static items(state: ListStateModel) {
    return state.items;
  }

  @InheritedSelector()
  static item(state: ListStateModel) {
    return state.item;
  }


  @InheritedSelector()
  static searchQuery(state: ListStateModel) {
    return state.query;
  }

  @Decorate(({actions}) => Action(actions.SearchItems))
  onSearchItems({patchState}: StateContext<ListStateModel<ListItemType, FilterType>>, {payload}: PayloadAction<FilterType>) {
    if (payload) {
      patchState({query: payload});
    }
    return this.service.search(payload)
      .pipe(tap(items => patchState({items})));
  }

  @Decorate(({actions}) => Action(actions.SelectItem))
  onSelectItem({patchState}: StateContext<ListStateModel<ListItemType, FilterType>>, {payload}: PayloadAction<ListItemType>) {
    patchState({item: payload});
  }


  @Decorate(({actions}) => Action(actions.ClearItems))
  onClearItems(ctx: StateContext<ListStateModel<ListItemType, FilterType>>) {
    ctx.patchState({items: []});
  }

}
