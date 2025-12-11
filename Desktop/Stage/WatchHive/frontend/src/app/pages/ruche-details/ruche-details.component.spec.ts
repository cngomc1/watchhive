import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RucheDetailsComponent } from './ruche-details.component';

describe('RucheDetailsComponent', () => {
  let component: RucheDetailsComponent;
  let fixture: ComponentFixture<RucheDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RucheDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RucheDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
