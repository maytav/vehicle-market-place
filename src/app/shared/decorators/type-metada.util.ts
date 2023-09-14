const META_PREFIX = '__$METADATA_';

export function getMetadata(target: any, name: string) {
  return target[META_PREFIX + name];
}

export function ensureObjectMetadata(target: any, name: string): any {
  const property = META_PREFIX + name;
  const parentMetadata = target[property];
  if (!target.hasOwnProperty(META_PREFIX)) {
    const value = parentMetadata ? {...parentMetadata} : {};
    Object.defineProperty(target, property, {value, configurable: true});
  }
  return target[property];
}


export function ensureArrayMetadata(target: any, name: string): any[] {
  const property = META_PREFIX + name;
  const parentMetadata = target[property];
  if (!target.hasOwnProperty(META_PREFIX)) {
    const value = parentMetadata ? [...parentMetadata] : [];
    Object.defineProperty(target, property, {value, configurable: true});
  }
  return target[property];
}
