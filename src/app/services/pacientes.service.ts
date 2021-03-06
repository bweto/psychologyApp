import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ConnectService } from './connect.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient, 
              private firestore: AngularFirestore,
              
              ) { }
   // Metodos para el CRUD del Paciente
   getAllPacientes() {
    return this.firestore.collection('pacientes').snapshotChanges();
   }
   getPaciente(id: string) {
    return this.firestore.collection('pacientes').doc(id).snapshotChanges();
   }
   createPaciente(paciente: any) {
    return this.firestore.collection('pacientes').add(paciente);
   }
   updatePaciente(id: string, paciente: any) {
    return this.firestore.collection('pacientes').doc(id).set(paciente);
   }
   deletePaciente(index: string) {
    return this.firestore.collection('pacientes').doc(index).delete();
   }
   
}
