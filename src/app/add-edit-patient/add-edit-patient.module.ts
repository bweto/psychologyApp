import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddEditPatientPage } from './add-edit-patient.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditPatientPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddEditPatientPage]
})
export class AddEditPatientPageModule {}
