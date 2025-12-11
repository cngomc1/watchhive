import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuchesComponent } from './ruches.component';

describe('RuchesComponent', () => {
  let component: RuchesComponent;
  let fixture: ComponentFixture<RuchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
