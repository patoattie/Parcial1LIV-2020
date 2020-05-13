import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
  @Input() pelicula: Pelicula;
  @Output() cerrarEvent = new EventEmitter<void>();

  constructor(private peliculas: PeliculasService) { }

  ngOnInit(): void {
  }

  public cerrarCard(): void {
    this.cerrarEvent.emit();
  }

  public getUrlImg(img: string): string {
    return this.peliculas.getUrlImg(img, 500);
  }
}
