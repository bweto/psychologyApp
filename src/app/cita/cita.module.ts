import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CitaPage } from './cita.page';

const routes: Routes = [
  {
    path: '',
    component: CitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CitaPage]
})
export class CitaPageModule {}
