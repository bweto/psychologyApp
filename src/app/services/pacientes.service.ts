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
  pacientes: Observable<any[]>;
  constructor(private http: HttpClient, 
              private firestore: AngularFirestore) {
    /* this.pacientes = [
      {
        name: 'Beto',
        lastName: 'Garcia',
        edad: '27',
        phone: '3115011330',
        address: 'calle falsa 123'
      }
    ]; */
    
  }

   getPacientes() {
    return this.http.get('https://randomuser.me/api/?results=15');
   }
   // Metodos para el CRUD del Paciente
   getAllPacientes() {
    /* if (this.pacientes !== 'undefined' && this.pacientes !== null) {
      return(this.pacientes);
    } */
    //return this.firestore.collection('pacientes').snapshotChanges();
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
