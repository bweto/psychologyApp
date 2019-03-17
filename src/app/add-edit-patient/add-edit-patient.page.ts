import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import  {PacientesService} from '../services/pacientes.service';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.page.html',
  styleUrls: ['./add-edit-patient.page.scss'],
})

export class AddEditPatientPage implements OnInit {

  paciente: any;
  tabIndex: number;
  itemIndex: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private pacienteList:PacientesService
  ) { }

  ngOnInit() {
    this.tabIndex = +this.route.snapshot.paramMap.get('tab');
    this.itemIndex = +this.route.snapshot.paramMap.get('item');
    if (this.itemIndex >= 0) {
      this.paciente = Object.assign({}, this.pacienteList.getPaciente(this.itemIndex));
    }
  }
  async error(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  save() {
    if (!this.paciente.task.length) {
      this.error('Los campos no pueden estar vacios');
    }
    else {
      if (this.itemIndex >= 0) {
        this.pacienteList.setPaciente(this.paciente, this.itemIndex);
      }
      else {
        this.pacienteList.setPaciente(this.tabIndex, this.paciente);
      }
      this.router.navigate(['/tabs/tab3']);
    }
  }
}
