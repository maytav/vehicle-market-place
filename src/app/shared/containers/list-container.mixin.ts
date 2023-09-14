import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {GetContext} from '@app/shared/decorators/context.decorator';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {Decorate, getContextValue} from '@app/shared/decorators/decorate.decorator';

export function ListContainerMixin<ItemType = any, FilterType = ItemType>() {
  // noinspection AngularMissingOrInvalidDeclarationInModule
  @Component({template: ''})
  class ListContainerComponent implements OnInit, OnDestroy {
    @GetContext() actions: any;
    store: Store;


    @Decorate(({stateClass}) => Select(stateClass.items))
    items$: Observable<ItemType[]>;

    @Decorate(({stateClass}) => Select(stateClass.item))
    item$: Observable<ItemType>;

    // items$: Observable<ItemType[]>;
    constructor(injector: Injector) {
      this.store = injector.get(Store);
      const stateClass = getContextValue(this, 'stateClass');
      // this.items$ = stateClass.items && this.store.select(stateClass.items);
    }

    // protected containedComponentRef: ContainedComponentRef;


    public onItemSelected(event: any) {
      return this.store.dispatch(new this.actions.SelectItem(event));
    }

    ngOnInit(): void {
      const stateClass = getContextValue(this, 'stateClass');
      /*    if (stateClass.selectedId) {
            this.defaultItem = this.store.selectSnapshot(stateClass.selectedId);
          }*/
      this.searchItems()
    }


    searchItems() {
      return this.store.dispatch(new this.actions.SearchItems({
        filter: this.getFilter()
      }));
    }

    clearItems() {
      return this.store.dispatch(new this.actions.ClearItems());
    }

    ngOnDestroy(): void {
      this.clearItems();
    }

    protected getFilter(): any {
      return null;
    }
  }

  return ListContainerComponent;
}
