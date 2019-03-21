import { Component, ViewChild} from '@angular/core';
import { AlertController, IonList} from '@ionic/angular';
import { PacientesService } from '../services/pacientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../models/patient';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('listaPacientes') listRef: IonList;
  pacientes: any [];
  index: number;
  constructor (
    public pacientesService: PacientesService,
    private alertController: AlertController,
    private router: Router
) { }

  ngOnInit() {
    /* this.pacientesService.getPacientes()
    .subscribe(
      (data) => {
        this.pacientes = data['results'];
      },
      (error) => {
       console.error(error);
      }
    ); */
    this.pacientes = this.pacientesService.getAllPacientes();
    this.index = this.pacientes.length;
    }
    async deletePaciente(index?: number) {
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
    }
    agregar() {
      this.router.navigate(['/add-edit-patient', {}]);
    }
    editarPaciente(index?: number) {
      const update = true;
      const id = index;
      const datos = { id, update };
      this.router.navigate(['/add-edit-patient', datos]);
    }
    showCita(idPaciente?: number) {
      const idPacie = idPaciente;
      const datos = { idPacie};
      this.router.navigate(['/show-cita', datos]);
    }
}
