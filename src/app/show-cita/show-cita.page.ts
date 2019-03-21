import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-show-cita',
  templateUrl: './show-cita.page.html',
  styleUrls: ['./show-cita.page.scss'],
})
export class ShowCitaPage implements OnInit {

  @ViewChild('listaCitas') listRef: IonList;
  citas: any [];
  index: number;
  idCita: number;
  idPaciente: number;
  constructor(
    public citaService: CitaService,
    private alertController: AlertController,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(datos => {
      this.idCita = datos.idCita || 0;
      this.idPaciente = datos.idPacie || '';
      this.citas = this.citaService.getAllCitas(this.idPaciente) || {};
      this.index = this.citas.length || 0;
    });
  }
  async deleteCita(index?: number) {
    const alert = await this.alertController.create({
      header: index === undefined ? 'Borrar Cita' : 'Borrar cita',
      message: '¿Lo vas a borrar?',
      buttons: [
        {
          text: 'Borrar',
          handler: () => {
            //this.listRef.closeSlidingItems();
              this.citaService.deleteCita(index);

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
    this.router.navigate(['/cita', {}]);
  }
  editarCita(index?: number) {
    const update = true;
    const id = index;
    const datos = { id, update };
    this.router.navigate(['/cita', datos]);
  }
  showCita(idCita: number) {

  }
}