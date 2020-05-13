import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Peliculas } from '../../clases/peliculas';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  public peliculas: Observable<Peliculas>;
  public items: MenuItem[];
  public listaPeliculas = true;
  public pagina = 1;

  constructor(
    public authService: AuthService,
    public peliculasService: PeliculasService
    ) { }

  ngOnInit() {
    this.peliculas = this.peliculasService.getPeliculas(this.pagina);

    this.items = [
      {label: 'Peliculas', command: () => {this.mostrarListaPeliculas(); }},
    ];
  }

  private mostrarListaPeliculas(): void
  {
    this.listaPeliculas = true;
  }
}
