import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezaComponent } from './pieza.component';

describe('PiezaComponent', () => {
  let component: PiezaComponent;
  let fixture: ComponentFixture<PiezaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiezaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
