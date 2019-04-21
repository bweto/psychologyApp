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
  email: string = '';
  constructor (
    public pacientesService: PacientesService,
    private authService: AuthService,
    private alertController: AlertController,
    private mostrarController: AlertController,
    private router: Router,
) { 
  
}

  ngOnInit() {
    this.email = this.authService.getEmail();
    this.cargarDatos();
    this.index = this.pacientes.length; 
  
    }
   
    cargarDatos(){
      this.pacientesService.getAllPacientes()
        .subscribe(paciente => {
          paciente.forEach(data =>{
            const paciente = data.payload.doc.data();
            const id = data.payload.doc.id
            Object.values(paciente).map( val =>{
              if(val === this.email){
                this.pacientes.push({id, paciente });
              }
            })
          })
        });

    }
    async deletePaciente(index: string) {
      console.log(index);
      const alert = await this.alertController.create({
        header: index === undefined ? 'Borrar paciente' : 'Borrar paciente',
        message: '¿Lo vas a borrar?',
        buttons: [
          {
            text: 'Borrar',
            handler: ()=>{this.borrar(index)}
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
      this.pacientes = [];
      this.router.navigate(['/add-edit-patient', {}]);
    }
 
    editarPaciente(id: string) {
      const update = true;
      const datos = { id, update };
      this.pacientes=[];
      this.router.navigate(['/add-edit-patient', datos]);
    } 
    borrar(index: string){
      this.pacientes = [];
      this.pacientesService.deletePaciente(index);
    }
     async showCita(data) {
      const msj = `Edad: ${data.edad} \n
                   ${data.email} \n
                   ${data.address} \n
                   ${data.phone} \n`;
                   
      const mostrar = await this.mostrarController.create({
        header: `${data.name} ${data.lastName}`,
        message:  msj,
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancelar'
          }
        ]
      });
      await mostrar.present();
    } 
    mostarPaciente(id: string){
    this.pacientesService.getPaciente(id)
        .subscribe(datos =>{
          const data = datos.payload.data();
          this.showCita(data);
        })
      }
}
