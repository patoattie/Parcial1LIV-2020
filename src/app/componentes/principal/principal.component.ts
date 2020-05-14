import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

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

  public items: MenuItem[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.items = [
      {label: 'Peliculas', command: () => {this.mostrarListaPeliculas(); }},
      {label: 'TV', command: () => {this.mostrarListaProgramas(); }},
    ];

    this.mostrarListaPeliculas();
  }

  private mostrarListaPeliculas(): void {
    this.router.navigate(['Peliculas'], {relativeTo: this.route});
  }

  private mostrarListaProgramas(): void {
    this.router.navigate(['Programas'], {relativeTo: this.route});
  }
}
