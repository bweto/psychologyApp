import { Component, ViewChild } from '@angular/core';
import { AlertController, IonList, IonTabs } from '@ionic/angular';
import { PacientesService } from '../services/pacientes.service';
import { Patient } from '../models/patient';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('ListPatient') listRef: IonList;
  tabIndex: number;
  reorder: boolean;

  constructor (
    public pacientesService: PacientesService,
    private alertController: AlertController
) { }

  ngOnInit () {
    /* this.pacientesService.getPacientes()
    .subscribe(
      (data) => {
        this.pacientes = data['results'];
      },
      (error) => {
       console.error(error);
      }
    ); */
    }

    toggleReorder() {
      this.reorder = !this.reorder;
    }
    setTab(tabIndex) {
      this.tabIndex = tabIndex;
    }
    async deleteItem(item?) {
      const alert = await this.alertController.create({
        header: item === undefined ? 'Delete all' : 'Borrar paciente',
        message: '¿Lo vas a borrar?',
        buttons: [
          {
            text: 'Borrado',
            handler: () => {
              this.listRef.closeSlidingItems();
                this.pacientesService.deletePaciente(this.tabIndex);              
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
}
