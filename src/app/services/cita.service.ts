import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  citas: any;
  constructor() {}
  getAllCitas(idPaciente: number) {
    if (this.citas !== 'undefined' && this.citas !== null){
      return this.citas.map((cita) => {
        cita[idPaciente] = idPaciente;
      });
    }
  }
  getCita(idCita: number, idPaciente: number) {
    return this.citas.map( (cita) => {
      cita[idCita] = idCita && cita[idPaciente].idPaciente;
    });
  }
  updateCita(idCita: number, cita: any) {
    return this.citas.splice(idCita, 1, cita);
  }
  deleteCita(idCita: number) {
    this.citas.splice(idCita, 1);
  }
  createCita(cita: any) {
    this.citas.push(cita);
  }
}
