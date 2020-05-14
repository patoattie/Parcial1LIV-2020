import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Programa } from '../../clases/programa';
import { ProgramasService } from '../../servicios/programas.service';
import { Programas } from '../../clases/programas';

@Component({
  selector: 'app-listado-programas',
  templateUrl: './listado-programas.component.html',
  styleUrls: ['./listado-programas.component.css']
})
export class ListadoProgramasComponent implements OnInit {

  public listaProgramas: Observable<Programas>;
  public peliculaSeleccionada: Programa = null;
  public cols: any[];
  public pagina = 1;

  constructor(
    public peliculas: ProgramasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listaProgramas = this.peliculas.getProgramas(this.pagina);

    this.cols = [
      { field: 'backdrop_path', header: 'Portada' },
      { field: 'name', header: 'Título' },
      { field: 'first_air_date', header: 'Fecha Estreno' },
      { field: 'original_name', header: 'Título Original' },
      { field: 'original_language', header: 'Idioma' }
    ];
  }

  public muestraDetalle(unPrograma: Programa): void {
    if (unPrograma) {
      this.router.navigate(['../Programa', unPrograma.id.toString()], {relativeTo: this.route});
    }
  }

  public getUrlImg(img: string): string {
    return this.peliculas.getUrlImg(img, 500);
  }
}
