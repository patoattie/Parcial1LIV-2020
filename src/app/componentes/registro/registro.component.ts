import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { EPerfil } from '../../enums/eperfil.enum';

import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';

import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public formRegistro: FormGroup;
  private enEspera: boolean; // Muestra u oculta el spinner
  public perfiles: SelectItem[];
  @Input() usuario: Usuario;
  @Input() usuarios: Usuario[];

  constructor(
    private miConstructor: FormBuilder,
    public authService: AuthService,
    private location: Location,
    private cd: ChangeDetectorRef,
    public usuariosService: UsuariosService,
    public messageService: MessageService
    )
  {
    this.formRegistro = this.miConstructor.group(
    {
      usuario: ['', Validators.compose([Validators.email, Validators.required])],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaClave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      perfil: ['', Validators.compose([Validators.required])],
      imagen: ['', Validators.compose([])],
      habilitaAdmin: ['', Validators.compose([])]
    });

    this.perfiles = [
      {label: EPerfil.Operador, value: EPerfil.Operador},
      {label: EPerfil.Admin, value: EPerfil.Admin}
    ];
  }

  onFileChange(event)
  {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length)
    {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () =>
      {
        this.formRegistro.patchValue(
        {
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  ngOnInit()
  {
    this.enEspera = false;

    if (this.usuario != null)
    {
      this.formRegistro.setValue({
        usuario: this.usuario.email,
        clave: '',
        confirmaClave: '',
        perfil: this.usuario.perfil,
        imagen: '',
        habilitaAdmin: ''
      });
    }
    else
    {
      this.formRegistro.setValue({usuario: '', clave: '', confirmaClave: '', perfil: '', imagen: '', habilitaAdmin: ''});
    }
  }

  private mostrarMsjErrorDatos(): void
  {
    if (this.formRegistro.controls.usuario.invalid)
    {
      if (this.formRegistro.controls.usuario.hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un E-Mail para identificarte'});
      }
      else if (this.formRegistro.controls.usuario.hasError('email'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'El E-Mail que ingresaste no es válido'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Usuario'});
      }
    }

    if (this.formRegistro.controls.clave.invalid)
    {
      if (this.formRegistro.controls.clave.hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Clave'});
      }
      else if (this.formRegistro.controls.clave.hasError('minlength'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La Clave debe tener como mínimo 6 caracteres'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Clave'});
      }
    }

    if (this.formRegistro.controls.perfil.invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Perfil'});
    }
  }

  private mostrarMsjErrorClave(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La confirmación de la clave no coincide con la clave ingresada'});
  }

  private mostrarMsjErrorAuth(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.authService.getError()});
  }

  private mostrarMsjErrorAdmin(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.usuariosService.getMsjErrorAdmin()});
  }

  private mostrarMsjOk(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'success', summary: 'Actualización Exitosa', detail: 'Se registró correctamente el usuario'});
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public eligeAdmin(): boolean
  {
    return this.formRegistro.value.perfil === EPerfil.Admin;
  }

  public async registrar(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; // Muestro el spinner

    if (this.formRegistro.valid)
    {
      if (this.formRegistro.value.clave === this.formRegistro.value.confirmaClave)
      {
        if (this.formRegistro.value.perfil === EPerfil.Admin
          && this.formRegistro.value.habilitaAdmin !== this.usuariosService.getPswAdmin())
        {
          this.mostrarMsjErrorAdmin();
        }
        else
        {
          const file = ( document.getElementById('img-file') as HTMLInputElement).files[0];

          await this.authService.SignUp(this.formRegistro.value.usuario, this.formRegistro.value.clave, null, file);

          usuarioValido = this.authService.isLoggedIn();
          if (usuarioValido)
          {
            const usuarioNuevo: Usuario = new Usuario(this.formRegistro.value.perfil, this.authService.getUserData());
            await this.usuariosService.updateUsuario(usuarioNuevo);
            this.mostrarMsjOk();
          }
          else
          {
            this.mostrarMsjErrorAuth();
          }
        }
      }
      else // El usuario no confirmó bien la clave
      {
        this.mostrarMsjErrorClave();
      }
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; // Oculto el spinner
  }

  public async actualizar(): Promise<void>
  {
    if (this.usuario != null)
    {
      const usuarioAnterior: Usuario = new Usuario(
        this.usuario.perfil,
        null,
        this.usuario.uid,
        this.usuario.email,
        this.usuario.displayName,
        this.usuario.photoURL,
        this.usuario.emailVerified
      );
      this.usuario.perfil = this.formRegistro.value.perfil;
      await this.usuariosService.updateUsuario(this.usuario);

      this.mostrarMsjOk();
    }
  }

  public goBack(): void
  {
    this.location.back();
  }
}
