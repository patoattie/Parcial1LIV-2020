import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Peliculas } from '../../clases/peliculas';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {
  @Input() listaPeliculas: Peliculas;
  public peliculaSeleccionada: Pelicula = null;
  public cols: any[];
  public verDetalle = false;

  constructor(
    public peliculas: PeliculasService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'backdrop_path', header: 'Portada' },
      { field: 'title', header: 'Título' },
      { field: 'release_date', header: 'Fecha Estreno' },
      { field: 'original_title', header: 'Título Original' },
      { field: 'original_language', header: 'Idioma' }
    ];
  }

  public muestraDetalle(muestra: boolean, unaPelicula?: Pelicula): void {
    this.verDetalle = muestra;
    if (unaPelicula) {
      this.peliculaSeleccionada = unaPelicula;
    }
  }

  public getUrlImg(img: string): string {
    return this.peliculas.getUrlImg(img, 500);
  }
}
