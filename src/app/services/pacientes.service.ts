import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  //pacientes: any;
  pacientes: any[] = [];
  constructor(private http: HttpClient, 
              private firestore: AngularFirestore) {   
  }
   // Metodos para el CRUD del Paciente
   getAllPacientes() {
    const tblPacientes = this.firestore.collection('pacientes');
    return tblPacientes.snapshotChanges();
   }
   getPaciente(index?: String) {
    //return this.pacientes[index];
    //this.firestore.collection('pacientes').doc(index).snapshotChanges();
   }
   createPaciente(paciente: any) {
    //this.pacientes.push(paciente);
    return this.firestore.collection('pacientes').add(paciente);
   }
   updatePaciente(index?: number, paciente?: any) {
    //this.pacientes.splice(index, 1, paciente);
   }
   deletePaciente(index?: string, data?: any) {
    //this.pacientes.splice(index, 1);
    //return this.firestore.collection('pacientes').doc(index).set(data);
   }
}
