import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ponto } from '../model/ponto.model';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { PontosMensais } from '../model/pontosMensais.model';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  private readonly API = 'http://192.168.68.36:8080/ponto'

  constructor(private http: HttpClient) { }

  public registrar(ponto: Ponto): Observable<Ponto> {
    return this.http.post<Ponto>(this.API, ponto).pipe(
      catchError(error => {
        // Captura o erro e retorna a mensagem
        return throwError(() => new Error(error.error.message || 'Erro desconhecido'));
      })
    );
  }
  public registrarSaida(ponto: Ponto): Observable<Ponto> {
    return this.http.put<Ponto>(this.API, ponto);
  }

  public buscarPontos(): Observable<Ponto[]> {
    return this.http.get<Ponto[]>(this.API);
  }

  public buscarPontosIndividuais(id: number): Observable<Ponto[]> {
    return this.http.get<Ponto[]>(this.API + "/" + id);
  }

  public buscarMensal(id: number): Observable<PontosMensais> {
    return this.http.get<PontosMensais>(this.API + "/mensal/" + id);
  }

  public ativo(ponto: Ponto): Observable<Ponto> {
    return this.http.put<Ponto>(this.API + "/" + ponto.id, { ativo: ponto.ativo });
  }

}
