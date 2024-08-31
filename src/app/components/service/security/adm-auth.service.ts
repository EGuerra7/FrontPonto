import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdmAuthService {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getPermissao() === 'Administrador') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
