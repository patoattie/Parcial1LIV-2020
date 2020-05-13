import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string): string {
    let retorno: string = null;

    if (value) {
      if (value.charAt(4) === '-' && value.charAt(7) === '-') {
        const año = value.substr(0, 4);
        const mes = value.substr(5, 2);
        const dia = value.substr(8, 2);

        retorno = dia.concat('/').concat(mes).concat('/').concat(año);
      }
    }
    return retorno;
  }

}
