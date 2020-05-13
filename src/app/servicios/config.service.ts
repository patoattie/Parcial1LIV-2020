import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private endPoint = 'https://api.themoviedb.org/3/';
  private pelis = 'discover/movie/';
  private claveApi = {
    clave: 'api_key',
    valor: '73f9841'.concat('cbba42072').concat('a2e12038').concat('92c07179')
  };
  private ordenPelis = {
    clave: 'sort_by',
    valor: 'popularity.desc'
  };
  private idioma = {
    clave: 'language',
    valor: 'es-MX'
  };

  constructor() { }

  public getEndPointPelis() {
    return this.endPoint.concat(this.pelis);
  }

  public getClaveApi() {
    return this.claveApi;
  }

  public getOrdenPelis() {
    return this.ordenPelis;
  }

  public getIdioma() {
    return this.idioma;
  }
}
