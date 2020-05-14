import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Peliculas } from '../../clases/peliculas';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {
  public listaPeliculas: Observable<Peliculas>;
  public cols: any[];
  public pagina = 1;

  constructor(
    public peliculas: PeliculasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listaPeliculas = this.peliculas.getPeliculas(this.pagina);

    this.cols = [
      { field: 'backdrop_path', header: 'Portada' },
      { field: 'title', header: 'Título' },
      { field: 'release_date', header: 'Fecha Estreno' },
      { field: 'original_title', header: 'Título Original' },
      { field: 'original_language', header: 'Idioma' }
    ];
  }

  public muestraDetalle(unaPelicula: Pelicula): void {
    if (unaPelicula) {
      this.router.navigate(['../Pelicula', unaPelicula.id.toString()], {relativeTo: this.route});
    }
  }

  public getUrlImg(img: string): string {
    return this.peliculas.getUrlImg(img, 500);
  }
}
