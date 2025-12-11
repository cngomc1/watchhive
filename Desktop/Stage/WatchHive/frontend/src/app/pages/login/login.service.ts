import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'VOTRE_ENDPOINT_API';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = { 
      'Authorization': 'Bearer VOTRE_TOKEN', 
      'Content-Type': 'application/json'
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
