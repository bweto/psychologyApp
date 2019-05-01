import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { PoliticaPagePageModule } from '../modales/politica-page/politica-page.module';



const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
    ],
  }

];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    //PoliticaPagePageModule
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
