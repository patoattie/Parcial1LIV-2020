import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {Usuario} from '../clases/usuario';
import {AuthService} from './auth.service';
import { EPerfil } from '../enums/eperfil.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService
{
  private usuarios: Observable<Usuario[]>;
  private usuarioDoc: AngularFirestoreDocument<Usuario>;
  private usuarioCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService)
  {
    this.usuarioCollection = this.afs.collection<any>('usuarios');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
    this.muestraAbm = false;
  }

  public getUsuarios(): Observable<Usuario[]>
  {
    return this.usuarios;
  }

  public getUsuarioObs(uid: string): Observable<Usuario> {
    this.usuarioDoc = this.afs.doc<Usuario>(`Usuarios/${uid}`);
    return this.usuarioDoc.valueChanges();
  }

  public getUsuario(uid: string): Usuario
  {
    let retorno: Usuario = JSON.parse(localStorage.getItem('usuario'));

    if (retorno === null || retorno.perfil === undefined)
    {
      this.usuarios.forEach(arrUsuarios =>
        {
          arrUsuarios.forEach(unUsuario =>
            {
              if (unUsuario.uid === uid)
              {
                retorno = unUsuario;
                localStorage.setItem('usuario', JSON.stringify(retorno));
              }
            });
        });
        // this.poblarLocal(uid);
      retorno = JSON.parse(localStorage.getItem('usuario'));
    }

    return retorno;
  }

  public getUsuarioMov(uid: string, usuarios: Usuario[]): Usuario
  {
    let retorno: Usuario = null;

    usuarios.forEach((unUsuario) =>
    {
      if (unUsuario.uid === uid)
      {
        retorno = unUsuario;
      }
    });

    return retorno;
  }

  public getUsuarioPorId(uid: string): Observable<Usuario>
  {
    return this.usuarioCollection.doc<any>(uid).valueChanges().pipe(
      take(1),
      map(usuario => {
        usuario.uid = uid;
        return usuario;
      })
    );
  }

  public updateUsuario(usuario: Usuario): Promise<void>
  {
    return this.usuarioCollection.doc(usuario.uid).update({
      perfil: usuario.perfil
    });
  }

  public deleteUsuario(uid: string): Promise<void>
  {
    return this.usuarioCollection.doc(uid).delete();
  }

  public SetData(usuario: DocumentReference): Promise<void>
  {
    const usuarioRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${usuario.id}`);
    const usuarioData = {
      uid: usuario.id,
      user: this.authService.getUserData()
    };
    return usuarioRef.set(usuarioData, {
      merge: true
    });
  }

  public getPswAdmin(): string
  {
    return 'admin1234';
  }

  public getMsjErrorAdmin(): string
  {
    return 'Clave de Administrador incorrecta';
  }

  public esAdmin(): boolean
  {
    return this.getUsuario(this.authService.getUid()).perfil === EPerfil.Admin;
  }

  public getEmail(): string
  {
    return this.authService.getEmail();
  }
}
