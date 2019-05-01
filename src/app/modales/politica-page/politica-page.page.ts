import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-politica-page',
  templateUrl: './politica-page.page.html',
  styleUrls: ['./politica-page.page.scss'],
})
export class PoliticaPagePage implements OnInit {

  @Input() titulo;
  @Input() body;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  
  salir() {
    this.modalCtrl.dismiss();
  }
}
