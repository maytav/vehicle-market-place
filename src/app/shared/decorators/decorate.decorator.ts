import {ensureArrayMetadata, ensureObjectMetadata, getMetadata} from '@app/shared/decorators/type-metada.util';
import {createDescriptor, hasValue, valueAsArray} from '@app/shared/utils/lang.util';
import {classDecorated$, emitClassDecorated} from '@app/shared/decorators/decorator.util';


// CONTEXT /////////////////////////////////

const CLASS_CONTEXT = 'CLASS_CONTEXT';
const PROPERTY_CONTEXT_PREFIX = 'CONTEXT_';

export function setClassContext(target: any, context: any): void {
  const classContext = ensureObjectMetadata(target, CLASS_CONTEXT);
  Object.assign(classContext, context);
}

export function setPropertyContext(target: any, propertyKey: string, context: any): void {
  const clazz = target.constructor;
  const metadataName = PROPERTY_CONTEXT_PREFIX + propertyKey;
  const propertyContext = ensureObjectMetadata(clazz, metadataName);
  Object.assign(propertyContext, context);
}

export function getClassContext(classOrObject: any): any {
  if (!classOrObject) {
    return {};
  }
  const clazz = classOrObject instanceof Function ? classOrObject : classOrObject.constructor;
  return getMetadata(clazz, CLASS_CONTEXT) || {};
}

export function getContextValue(classOrObject: any, fieldName: string, optional?: boolean): any {
  const context = getClassContext(classOrObject);
  const value = context[fieldName];
  if (value === undefined && !optional) {
    const clazz = classOrObject instanceof Function ? classOrObject : classOrObject.constructor;
    throw new Error(
      `'${fieldName}' not defined for ${clazz.name} class. Please set '${fieldName}' value by adding @Decorate({${fieldName}: <value>}) decorator.`);
  }
  return value;
}

// DECORATE ///////////////////////////////////////////////////////

const DECORATORS = 'DECORATORS';

interface DecoratorMetadata {
  target: any
  propertyKey: string;
  descriptor: PropertyDescriptor;
  definition: (value: any) => any;
}

function registerPropertyDecorator(
  definition: (value: any) => any, target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  // noinspection JSMismatchedCollectionQueryUpdate
  const decorators: DecoratorMetadata[] = ensureArrayMetadata(target.constructor, DECORATORS);
  decorators.push({definition, target, propertyKey, descriptor});
}

function applyClassDecorators(definition: (value: any) => any, target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  if (definition) {
    const classContext = getMetadata(target, CLASS_CONTEXT) || {};
    const decorators = definition(classContext);
    valueAsArray(decorators).filter(hasValue)
      .forEach(decorator => decorator(target, propertyKey, descriptor));
  }
}

function applyPropertiesDecorators(target: any): void {
  const decoratorsMetadata: DecoratorMetadata[] = getMetadata(target, DECORATORS);
  const classContext = getMetadata(target, CLASS_CONTEXT);
  if (decoratorsMetadata) {
    for (const metadata of decoratorsMetadata) {
      const propertyKey = metadata.propertyKey;
      const propertyContext = getMetadata(target, PROPERTY_CONTEXT_PREFIX + propertyKey);
      const mergedContext = {...classContext, ...propertyContext};
      const decorators = metadata.definition(mergedContext);
      const prototype = target.prototype;
      valueAsArray(decorators).filter(hasValue)
        .forEach(decorator => decorator(prototype, propertyKey, createDescriptor(prototype[propertyKey])));
    }
  }
}

function decorateClass<T>(definitions: (((context: T) => any) | T)[], target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  for (const definition of definitions) {
    if (definition instanceof Function) {
      // definition is a function, it's a decorator definition
      applyClassDecorators(definition, target, propertyKey, descriptor);
    } else {
      // definition is an object, it's a context definition
      setClassContext(target, definition);
    }
  }
}

function decorateProperty<T>(definitions: (((context: T) => any) | T)[], target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  for (const definition of definitions) {
    if (definition instanceof Function) {
      // definition is a function, it's a decorator definition
      registerPropertyDecorator(definition, target, propertyKey, descriptor);
    } else {
      // definition is an object, it's a context definition
      setPropertyContext(target, propertyKey, definition);
    }
  }
}

export function Decorate<T = any>(...definitions: (T | ((context: T) => any))[]): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    if (propertyKey) {
      decorateProperty(definitions, target, propertyKey, descriptor);
    } else {
      decorateClass(definitions, target, propertyKey, descriptor);
      emitClassDecorated(target);
    }
  };
}

classDecorated$.subscribe(applyPropertiesDecorators);
