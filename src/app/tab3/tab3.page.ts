import { Component } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
import { Patient } from '../models/patient';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
pacientes:Patient [] = [];
  constructor (
    public pacientesService: PacientesService
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
    this.pacientesService.getLocalPatient()
    .subscribe(
      (data) => {
        this.pacientes = data['results'];
      },
      (error) => {
       console.error(error);
      }
    );
    }

    addPatient(){

    }
}
