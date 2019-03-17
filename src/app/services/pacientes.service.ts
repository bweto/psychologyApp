import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  pacientes: any;

  constructor(private http: HttpClient) {
    this.pacientes = [];
  }

   getPacientes() {
    return this.http.get('https://randomuser.me/api/?results=15');
   }

   getAllPacientes(index){
    let pacientes = localStorage.getPaciente('todo-list-'+ index);
    if (pacientes !== 'undefined' && pacientes !== null) {
      this.pacientes[index] = JSON.parse(pacientes);
    }
    if (index>=this.pacientes.length) this.pacientes.push([]);
    return(this.pacientes[index]);
   }
   
   savePaciente(listIndex){
    localStorage.setItem('todo-list-'+listIndex,
     JSON.stringify(this.pacientes[listIndex]));
   }

   getPaciente(index){
    return(this.pacientes[index]);
   }
   setPaciente(paciente, index ){
    if (index == undefined) this.pacientes.push(Object.assign({}, paciente));
    else this.pacientes[index] = Object.assign({}, paciente);
    this.savePaciente(index);  
   }

   deletePaciente(index){
    this.pacientes.splice(index,1);
    this.savePaciente(index);
   }
}
