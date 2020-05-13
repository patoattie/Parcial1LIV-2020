import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(
    private config: ConfigService,
    private http: HttpService
  ) { }

  public getPeliculas() {
    return this.http.peticionGet(this.config.getEndPointPelis(), this.armarParams());
  }

  public armarParams() {
    const orden = this.config.getOrdenPelis();
    const clave = this.config.getClaveApi();
    const idioma = this.config.getIdioma();

    const retorno = {
      [orden.clave]: orden.valor,
      [clave.clave]: clave.valor,
      [idioma.clave]: idioma.valor
    };

    return retorno;
  }
}
