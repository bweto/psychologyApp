import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  constructor(private firestore: AngularFirestore) {}
  //CRUD de citas
  getAllCitas() {
    return this.firestore.collection('citas').snapshotChanges();
   }
   getCita(id: string) {
    return this.firestore.collection('citas').doc(id).snapshotChanges();
   }
   createCita(cita: any) {
    return this.firestore.collection('citas').add(cita);
   }
   updateCita(id: string, cita: any) {
    return this.firestore.collection('citas').doc(id).set(cita);
   }
   deleteCita(index: string) {
    return this.firestore.collection('citas').doc(index).delete();
   }
}
