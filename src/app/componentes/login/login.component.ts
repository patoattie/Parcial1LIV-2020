import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { UsuariosService } from '../../servicios/usuarios.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /*private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando...";
  logeando=true;
  ProgresoDeAncho:string;*/
  public formLogin: FormGroup;
  private enEspera: boolean; // Muestra u oculta el spinner

  // clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private miConstructor: FormBuilder,
    // private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private usuariosService: UsuariosService,
    public messageService: MessageService
    )
    {
      // this.progreso=0;
      // this.ProgresoDeAncho="0%";
      this.formLogin = this.miConstructor.group(
      {
        usuario: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
    }

  ngOnInit()
  {
    this.enEspera = false;
/*console.log('suscribo');
    this.authService.loginEvent
    .subscribe(evento => {
      if (evento) {
console.log('navego');
        this.router.navigate(['Principal']);
      }
    });*/
  }

  ngOnDestroy() {
    // this.authService.loginEvent.unsubscribe();
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  private mostrarMsjErrorDatos(): void
  {
    if (this.formLogin.controls.usuario.invalid)
    {
      if (this.formLogin.controls.usuario.hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un E-Mail para identificarte'});
      }
      else if (this.formLogin.controls.usuario.hasError('email'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'El E-Mail que ingresaste no es válido'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Usuario'});
      }
    }

    if (this.formLogin.controls.clave.invalid)
    {
      if (this.formLogin.controls.clave.hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Clave'});
      }
      else if (this.formLogin.controls.clave.hasError('minlength'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La Clave debe tener como mínimo 6 caracteres'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Clave'});
      }
    }
  }

  private mostrarMsjErrorAuth(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.authService.getError()});
  }

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; // Muestro el spinner

    if (this.formLogin.valid)
    {
      await this.authService.SignIn(this.formLogin.value.usuario, this.formLogin.value.clave);
      await this.authService.getFireUser();
      // usuarioValido = this.authService.isLoggedIn();
      usuarioValido = (await this.authService.getFireUser()).uid.length > 0;
      if (usuarioValido)
      {
        // this.completarUsuario('blanquear');
        // this.router.navigate(['Principal']);
        // this.usuariosService.getUsuario(this.authService.getUid());
      }
      else
      {
        this.mostrarMsjErrorAuth();
      }
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; // Oculto el spinner
  }

  public completarUsuario(): void
  {
    this.formLogin.setValue({usuario: 'pepe@pepe.com', clave: '123456'});
  }

  public completarAdmin(): void
  {
    this.formLogin.setValue({usuario: 'admin@admin.com', clave: '111111'});
  }
}
