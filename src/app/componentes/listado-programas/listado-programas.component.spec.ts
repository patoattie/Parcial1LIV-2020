import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProgramasComponent } from './listado-programas.component';

describe('ListadoProgramasComponent', () => {
  let component: ListadoProgramasComponent;
  let fixture: ComponentFixture<ListadoProgramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProgramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
