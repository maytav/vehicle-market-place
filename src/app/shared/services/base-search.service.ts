import {Observable} from 'rxjs';
import {Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {object2HttpParams} from '@app/shared/utils/http.util';


export abstract class BaseSearchService<ListItemType = any, FilterType = ListItemType, IdType = number> {

  public baseUrl = 'https://api.api-ninjas.com/v1/cars'
  protected http: HttpClient;

  protected constructor(injector: Injector) {
    // this.baseUrl = this.baseUrl + url;
    this.http = injector.get(HttpClient);

  }

  search(query: any): Observable<ListItemType[]> {
    console.log(query)
    let params = object2HttpParams(query.filter);
    return this.http.get<ListItemType[]>(this.baseUrl, {params})
  }
}
