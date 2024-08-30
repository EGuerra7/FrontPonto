import { Usuario } from './../model/usuario.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginReponse } from '../model/login.model';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/usuario'

  constructor(private http: HttpClient) { }

  public registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  public buscarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  public editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.API, usuario);
  }

  public DeletarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(this.API + "/" + usuario.id);
  }

}
