import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {
  @Input() listaPeliculas: Pelicula[];
  public peliculaSeleccionada: Pelicula = null;
  public cols: any[];
  public verDetalle = false;

  constructor(
    public peliculas: PeliculasService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'poster_path', header: 'Portada' },
      { field: 'title', header: 'Título' },
      { field: 'release_date', header: 'Fecha Estreno' },
      { field: 'original_title', header: 'Título Original' },
      { field: 'original_language', header: 'Idioma' }
    ];
  }


  public transformaFecha(timestamp: string): string
  {
    const año: string = timestamp.substr(0, 4);
    const mes: string = timestamp.substr(4, 2);
    const dia: string = timestamp.substr(6, 2);
    const hora: string = timestamp.substr(8, 2);
    const minuto: string = timestamp.substr(10, 2);
    const segundo: string = timestamp.substr(12, 2);
    const sepFecha = '/';
    const sepHora = ':';

    return dia + sepFecha + mes + sepFecha + año + ' ' + hora + sepHora + minuto + sepHora + segundo;
  }

  public eligePelicula(event, unaPelicula: Pelicula): void
  {
    if (event.ctrlKey)
    {
      this.peliculaSeleccionada = null;
    }
    else
    {
      this.peliculaSeleccionada = unaPelicula;
    }
  }

  public muestraDetalle(muestra: boolean): void
  {
    this.verDetalle = muestra;
  }

  public getUrlImg(img: string): string {
    return this.peliculas.getUrlImg(img, 500);
  }
}
