import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'form-paciente', loadChildren: './form-paciente/form-paciente.module#FormPacientePageModule' },
  { path: 'add-edit-patient', loadChildren: './add-edit-patient/add-edit-patient.module#AddEditPatientPageModule' },
  { path: 'add-edit-patient:paciente', loadChildren: './add-edit-patient/add-edit-patient.module#AddEditPatientPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
