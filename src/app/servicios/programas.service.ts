import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor(
    private config: ConfigService,
    private http: HttpService
  ) { }

  public getProgramas(pag: number) {
    return this.http.peticionGet(this.config.getEndPointProgramas(), this.armarParams(pag));
  }

  public getPrograma(idPrograma: string) {
    return this.http.peticionGet(this.config.getEndPointUnPrograma(idPrograma), this.armarParamsUnPrograma());
  }

  private armarParams(pag: number) {
    const orden = this.config.getOrdenProgramas();
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

  private armarParamsUnPrograma() {
    const clave = this.config.getClaveApi();
    const idioma = this.config.getIdioma();

    const retorno = {
      [clave.clave]: clave.valor,
      [idioma.clave]: idioma.valor
    };

    return retorno;
  }

  public getUrlImg(img: string, size: number): string {
    return this.config.getUrlImg(img, size);
  }
}
