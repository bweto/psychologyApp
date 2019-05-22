import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ConnectService } from './connect.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  constructor(private firestore: AngularFirestore,
    private connectService: ConnectService,
    public toastController: ToastController
    ) {}
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
