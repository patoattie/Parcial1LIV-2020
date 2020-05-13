import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  public muestraDetalle = false;

  constructor(
    private config: ConfigService,
    private http: HttpService
  ) { }

  public getPeliculas(pag: number) {
    return this.http.peticionGet(this.config.getEndPointPelis(), this.armarParams(pag));
  }

  public armarParams(pag: number) {
    const orden = this.config.getOrdenPelis();
    const clave = this.config.getClaveApi();
    const idioma = this.config.getIdioma();
    const pagina = this.config.getPagina(pag);

    const retorno = {
      [orden.clave]: orden.valor,
      [clave.clave]: clave.valor,
      [idioma.clave]: idioma.valor,
      [pagina.clave]: pagina.valor
    };

    return retorno;
  }

  public getUrlImg(img: string, size: number): string {
    return this.config.getUrlImg(img, size);
  }
}
