import {createSelector} from '@ngxs/store';
import {ensureObjectMetadata, getMetadata} from '@app/shared/decorators/type-metada.util';
import {classDecorated$} from '@app/shared/decorators/decorator.util';


const INHERITED_SELECTORS = 'INHERITED_SELECTORS';

export function InheritedSelector(...args: any[]) {
  return (target: any, propertyKey: string) => {
    const inheritedSelectors = ensureObjectMetadata(target, INHERITED_SELECTORS);
    inheritedSelectors[propertyKey] = {method: target[propertyKey], args};
  };
}

function inheritSelectors(target: any) {
  const inheritedSelectors = getMetadata(target, INHERITED_SELECTORS);
  if (inheritedSelectors) {
    Object.keys(inheritedSelectors).forEach(selectorName => {
      const selectorMetadata = inheritedSelectors[selectorName];
      const originalSelector = selectorMetadata.method;
      const selectors = selectorMetadata.args.length ? selectorMetadata.args : [target];
      target[selectorName] = createSelector(selectors, (...args: any[]) => {
        return originalSelector.apply(target, args);
      });
    });
  }
}

export function InheritSelectors() {
  return inheritSelectors;
}

classDecorated$.subscribe(inheritSelectors);
