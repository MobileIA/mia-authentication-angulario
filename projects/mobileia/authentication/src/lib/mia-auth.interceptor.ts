import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class MiaAuthInterceptor implements HttpInterceptor {

    constructor(
        protected authService: AuthenticationService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getAccessToken().pipe(switchMap(accessToken => {
            return next.handle(req.clone({
                setHeaders: { "X-Api-Key": accessToken },
                params: req.params.append('access_token', accessToken),
              }));
        }));

    }
}