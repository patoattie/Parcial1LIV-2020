import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private datos: any[];

  constructor() {
    this.datos = JSON.parse(localStorage.getItem('favoritos'));
  }

  public getFavoritos(): any[] {
    return this.datos;
  }

  public getFavorito(id: string): any[] {
    return this.datos.find(unDato => unDato.id.toString() === id);
  }

  public guardar(dato: any): void {
    if (!this.datos) {
      this.datos = [];
    }

    if (this.existeDato(dato) === -1) {
      this.datos.push(dato);
      localStorage.setItem('favoritos', JSON.stringify(this.datos));
    }
  }

  public borrar(dato: any): void {
    const posicion = this.existeDato(dato);

    if (!this.datos) {
      this.datos = [];
    }

    if (posicion > -1) {
      this.datos.splice(posicion, 1);
      localStorage.setItem('favoritos', JSON.stringify(this.datos));
    }
  }

  private existeDato(dato: any): number {
    return this.datos.findIndex(unDato => unDato.id === dato.id);
  }
}
