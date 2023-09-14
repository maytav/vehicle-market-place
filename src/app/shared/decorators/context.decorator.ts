import {classDecorated$} from '@app/shared/decorators/decorator.util';
import {ensureArrayMetadata, getMetadata} from '@app/shared/decorators/type-metada.util';
import {getClassContext, setClassContext, setPropertyContext} from '@app/shared/decorators/decorate.decorator';


const INJECT_CONTEXT_TO_PROPS = 'INJECT_CONTEXT';

interface InjectMetadata {
  target: any
  propertyKey: string;
  contextKey: string
  options: { optional?: boolean };
}

function injectContext(target: any): void {
  const injectProperties: InjectMetadata[] = getMetadata(target, INJECT_CONTEXT_TO_PROPS) || [];
  const classContext = getClassContext(target);

  for (const injectProperty of injectProperties) {
    const contextKey = injectProperty.contextKey || injectProperty.propertyKey;
    const value = classContext[contextKey];
    (target.prototype)[injectProperty.propertyKey] = value;
    if (value === undefined && !injectProperty.options?.optional) {
      throw new Error(
        `'${contextKey}' not defined for ${target.name} class. Please set '${contextKey}' value by adding @Decorate({${contextKey}: <value>}) decorator.`);
    }
  }
}

classDecorated$.subscribe(injectContext);

export function GetContext(contextKey: string = '', options: { optional?: boolean } = {optional: false}): any {
  return (target: any, propertyKey: string) => {
    // noinspection JSMismatchedCollectionQueryUpdate
    const props: InjectMetadata[] = ensureArrayMetadata(target.constructor, INJECT_CONTEXT_TO_PROPS);
    props.push({target, propertyKey, contextKey, options});
  };
}

export function SetContext(context: any): any {
  return (target: any, propertyKey: string) => {
    if (propertyKey) {
      setPropertyContext(target, propertyKey, context);
    } else {
      setClassContext(target, context);
    }
  };
}
