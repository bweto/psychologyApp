import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.page.html',
  styleUrls: ['./form-paciente.page.scss'],
})
export class FormPacientePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  salir() {
    this.router.navigate(['tabs/tab2']);
  }
}
