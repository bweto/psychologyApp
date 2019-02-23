import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) {}

   getPacientes() {
    return this.http.get('https://randomuser.me/api/?results=15');
   }
}
