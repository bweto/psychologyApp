import { AuthService } from './../services/auth.service';
import { Component, ViewChild} from '@angular/core';
import { AlertController, IonList} from '@ionic/angular';
import { PacientesService } from '../services/pacientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('listaPacientes') listRef: IonList;
  pacientes: any[] = [];
  index: number;
  id: string;
  email: string;
  constructor (
    public pacientesService: PacientesService,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
) { }

  ngOnInit() {
    this.email = this.authService.getEmail();
    this.pacientesService.getAllPacientes()
        .subscribe(paciente => {
          console.log('primero',paciente);
          paciente.forEach(data =>{
            const info = data.payload.doc.data();
            Object.values(info).map( val =>{
              if(val === this.email){
                this.pacientes.push(data.payload.doc.data());
              }
            })
            
          })
        });

    this.index = this.pacientes.length; 
  
    }
   /*  async deletePaciente(index?: number) {
      console.log(index);
      const alert = await this.alertController.create({
        header: index === undefined ? 'Borrar paciente' : 'Borrar paciente',
        message: '¿Lo vas a borrar?',
        buttons: [
          {
            text: 'Borrar',
            handler: () => {
                this.pacientesService.deletePaciente(index);

            }
          },
          {
            text: 'CANCELAR',
            role: 'cancelar'
          }
        ]
      });
      await alert.present();
    } */
    agregar() {
      this.router.navigate(['/add-edit-patient', {}]);
    }
    /* editarPaciente(index?: number) {
      const update = true;
      const id = index;
      const datos = { id, update };
      this.router.navigate(['/add-edit-patient', datos]);
    } */
    /* showCita(index?: number) {
      const idPacie = index;
      const data = {
        idPaciente: idPacie
      }
      this.router.navigate(['/show-cita', data]);
    } */
}
