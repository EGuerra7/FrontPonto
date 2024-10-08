import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RfidService {

  private readonly API = 'http://192.168.2.102:8080/rfid'

  constructor(private http: HttpClient) { }

  getRfid(): Observable<string> {
    return this.http.get<string>(this.API, { responseType: 'text' as 'json' });
  }
}
