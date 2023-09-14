import {Subject} from 'rxjs';


const _classDecorated$ = new Subject<any>();

export function emitClassDecorated(target: any) {
  _classDecorated$.next(target);
}

export const classDecorated$ = _classDecorated$.asObservable();
