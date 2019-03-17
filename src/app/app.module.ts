import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './login/login.module';
import { PacientesService } from './services/pacientes.service';
import { RegistrationPatientComponent } from './registration-patient/registration-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPatientComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PacientesService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
