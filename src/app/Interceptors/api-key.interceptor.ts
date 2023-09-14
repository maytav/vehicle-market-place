import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private apiKey = 'ebV8PLhO2MRIOCPe8W0fAA==xFcAE13SzDG1VhpU';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = request.clone({
      setHeaders: {'X-Api-Key': this.apiKey}
    });
    return next.handle(modifiedReq);
  }
}
