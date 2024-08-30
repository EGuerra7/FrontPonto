import { Injectable } from '@angular/core';
import { LoginReponse } from '../model/login.model';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8080/usuario/login'

  constructor(private http: HttpClient, private router: Router) { }

  public login(usuario: LoginReponse): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  logout() {
    // Limpe os dados de autenticação
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  salvarUsuario(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obterUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  isLoggedIn(): boolean {
    return this.obterUsuario() !== null;
  }

  getPermissao() {
    const usuario = this.obterUsuario();
    return usuario ? usuario.permissao : null;
  }

}
