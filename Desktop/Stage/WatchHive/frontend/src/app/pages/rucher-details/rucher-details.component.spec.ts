import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RucherDetailsComponent } from './rucher-details.component';

describe('RucherDetailsComponent', () => {
  let component: RucherDetailsComponent;
  let fixture: ComponentFixture<RucherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RucherDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RucherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
