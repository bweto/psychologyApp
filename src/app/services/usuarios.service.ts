import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public firestore: AngularFirestore) { }

  obtenerUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  agregarUsuario(mail: string) {
    const data = {
                  mail: mail
                  };
    return this.firestore.collection('usuarios').add(data);
  }
}
