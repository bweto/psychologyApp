import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  pacientes: any;

  constructor(private http: HttpClient) {
    this.pacientes = [
      {
        name: 'Beto',
        lastName: 'Garcia',
        edad: '27',
        phone: '3115011330',
        address: 'calle falsa 123'
      }
    ];
  }

   getPacientes() {
    return this.http.get('https://randomuser.me/api/?results=15');
   }
   // Metodos para el CRUD del Paciente
   getAllPacientes() {
    if (this.pacientes !== 'undefined' && this.pacientes !== null) {
      return(this.pacientes);
    }
   }
   getPaciente(index: number) {
    return this.pacientes[index];
   }
   createPaciente(paciente: any) {
    this.pacientes.push(paciente);
   }
   updatePaciente(index: number, paciente: any) {
    this.pacientes.splice(index, 1, paciente);
   }
   deletePaciente(index: number) {
    this.pacientes.splice(index, 1);
   }
}
