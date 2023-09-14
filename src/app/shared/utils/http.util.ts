import {HttpParams} from '@angular/common/http';


export function object2HttpParams(obj: any) {
  let params = new HttpParams();
  if (obj) {
    Object.keys(obj).forEach(field => {
        let value = obj[field];
        if (value && value.toJSON) {
          value = value.toJSON();
        }
        params = params.set(field, value);
      },
    );
  }
  return params;
}
