import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = 'http://localhost:3000/api'; // ajuste si besoin

  constructor(private http: HttpClient) {}

  // Auth (placeholders — on n'implemente pas encore auth serveur)
  login(payload: any): Observable<any> {
    // simulate successful login for now
    return of({ token: 'local-token' });
  }

  register(payload: any): Observable<any> {
    return of({ ok: true });
  }

  // Ruches
  getRuches(): Observable<any> {
    return this.http.get(`${this.base}/ruches`);
  }
  getRuche(id: string) {
    return this.http.get(`${this.base}/ruches/${id}`);
  }

  // Ruchers
  getRuchers(): Observable<any> {
    return this.http.get(`${this.base}/ruchers`);
  }
  getRucher(id: string) {
    return this.http.get(`${this.base}/ruchers/${id}`);
  }

  // Alerts settings
  getAlertSettings() {
    return this.http.get(`${this.base}/alerts`);
  }
  saveAlertSettings(payload: any) {
    return this.http.put(`${this.base}/alerts`, payload);
  }

  // Historiques
  getHistoriques(): Observable<any> {
    return this.http.get(`${this.base}/historiques`);
  }
}
