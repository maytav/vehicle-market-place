import {PayloadAction} from '@app/shared/stores/models/payload.action';
import {EmptyAction} from '@app/shared/stores/models/empty.action';
import {ActionType} from '@app/shared/stores/models/action.type';

export interface ListActions<FilterType = any> {
  SearchItems: ActionType<PayloadAction<FilterType>>;
  ClearItems: ActionType<EmptyAction>;
}

export const createListActions = <ListItemType = any, FilterType = any>(type: string) => {
  return {

    SearchItems: class extends PayloadAction<FilterType> {
      static type = `[${type}] SearchItems`;
    },

    SelectItem: class extends PayloadAction<ListItemType> {
      static type = `[${type}] SelectItem`;

      constructor(payload: ListItemType) {
        super(payload);
      }
    },

    ClearItems: class extends EmptyAction {
      static type = `[${type}] ClearItems`;
    },
  };
};
