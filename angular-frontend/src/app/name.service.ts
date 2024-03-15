import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  private apiUrl = 'http://localhost:5290/api/Names';

  constructor(private http: HttpClient) { }

  getNames(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addName(firstName: string, lastName: string): Observable<any> {
    return this.http.post(this.apiUrl, { firstName, lastName });
  }

  editName(id: number, firstName: string, lastName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { firstName, lastName });
  }

  deleteName(firstName: string, lastName?: string): Observable<any> {
    let params = new HttpParams().set('firstName', firstName);
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    return this.http.delete(`${this.apiUrl}`, { params });
  }
}
