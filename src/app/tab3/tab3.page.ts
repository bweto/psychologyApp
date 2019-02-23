import { Component } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
pacientes: any [] = [];
  constructor (
    public pacientesService: PacientesService
) { }

  ngOnInit () {
    this.pacientesService.getPacientes()
    .subscribe(
      (data) => {
        this.pacientes = data['results'];
      },
      (error) => {
       console.error(error);
      }
    );
    }
}
