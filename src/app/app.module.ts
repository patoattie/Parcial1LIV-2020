import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from './servicios/auth.service';
import {DatePipe} from '@angular/common';

// primeNG
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ListboxModule} from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuModule} from 'primeng/menu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosService } from './servicios/usuarios.service';
import { ErrorComponent } from './componentes/error/error.component';
import { ListadoPeliculasComponent } from './componentes/listado-peliculas/listado-peliculas.component';
import { DetallePeliculaComponent } from './componentes/detalle-pelicula/detalle-pelicula.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { DetalleProgramaComponent } from './componentes/detalle-programa/detalle-programa.component';
import { ListadoProgramasComponent } from './componentes/listado-programas/listado-programas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    CabeceraComponent,
    RegistroComponent,
    ErrorComponent,
    ListadoPeliculasComponent,
    DetallePeliculaComponent,
    FechaPipe,
    DetalleProgramaComponent,
    ListadoProgramasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    InputTextareaModule,
    ListboxModule,
    ToastModule,
    TabMenuModule,
    MenuModule,
    TieredMenuModule,
    TableModule,
    DialogModule,
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    AuthService,
    UsuariosService,
    DatePipe,
    MessageService,
    { provide: SETTINGS, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
