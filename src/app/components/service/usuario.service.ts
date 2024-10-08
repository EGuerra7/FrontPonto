import { Usuario } from './../model/usuario.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://192.168.2.102:8080/usuario'

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

  public BuscaUmPorRfid(rfid: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.API + "/" + rfid);
  }

  public BuscaUmPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API + "/identificador/" + id);
  }
}
