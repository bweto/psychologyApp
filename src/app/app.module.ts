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
import { AngularFireModule } from '@angular/fire';//'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';//'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
//'angularfire2/auth';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationPatientComponent,  
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PacientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
