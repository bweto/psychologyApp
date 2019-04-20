import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
@Injectable({
  providedIn: 'root'
})
export class PacientesFormulario {

  pacientes: any;

  constructor(private http: HttpClient) {
    this.pacientes = [
      {
        name: 'Tonny',
        lastName: 'Meola',
        edad: '21',
        phone: '1129485649',
        address: 'avenida siempre viva 21'
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
