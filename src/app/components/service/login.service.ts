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

  private readonly API = 'https://backponto.onrender.com/usuario/login'

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
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioJson = localStorage.getItem('usuario');
      return usuarioJson ? JSON.parse(usuarioJson) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.obterUsuario() !== null;
  }

  getPermissao() {
    const usuario = this.obterUsuario();
    return usuario ? usuario.permissao : null;
  }

}
