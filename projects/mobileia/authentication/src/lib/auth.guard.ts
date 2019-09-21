import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const reply = this.authService.isLoggedIn;
      reply.subscribe(isLogged => {
        if (!isLogged) {
          console.log(window.location.pathname);
          // Navigate to the login page with extras
          this.router.navigate(['/login'], { queryParams: {redirect: window.location.pathname } });
        }
      });
      return reply;
  }
}