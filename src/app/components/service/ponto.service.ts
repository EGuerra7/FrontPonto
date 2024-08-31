import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ponto } from '../model/ponto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  private readonly API = 'http://localhost:8080/ponto'

  constructor(private http: HttpClient) { }

  public registrarHoraInicial(ponto: Ponto): Observable<Ponto> {
    return this.http.post<Ponto>(this.API, ponto);
  }
  public registrarHoraFinal(ponto: Ponto): Observable<Ponto> {
    return this.http.put<Ponto>(this.API, ponto);
  }

  public buscarPontos(): Observable<Ponto[]> {
    return this.http.get<Ponto[]>(this.API);
  }

  public buscarPontosIndividuais(ponto: Ponto): Observable<Ponto[]>{
    return this.http.get<Ponto[]>(this.API + "/" + ponto.usuarioId);
  }

  public buscarMensal(ponto: Ponto): Observable<PontosMensais[]>{
    return this.http.get<PontosMensais[]>(this.API + "/mensal/" + ponto.usuarioId);
  }

}
