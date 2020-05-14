import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit, OnDestroy {
  public pelicula: Pelicula;
  private desuscribirEvent = new Subject<void>();

  constructor(
    private peliculas: PeliculasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.peliculas.getPelicula(this.route.snapshot.paramMap.get('id'))
    .pipe(takeUntil(this.desuscribirEvent))
    .subscribe(laPelicula => this.pelicula = laPelicula);
  }

  ngOnDestroy(): void {
    this.desuscribirEvent.next();
    this.desuscribirEvent.complete();
  }

  public cerrarCard(): void {
    this.router.navigate(['../../Peliculas'], {relativeTo: this.route});
  }

  public getUrlImg(img: string): string {
    return this.peliculas.getUrlImg(img, 500);
  }
}
