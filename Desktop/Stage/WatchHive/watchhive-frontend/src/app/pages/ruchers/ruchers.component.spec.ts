import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuchersComponent } from './ruchers.component';

describe('RuchersComponent', () => {
  let component: RuchersComponent;
  let fixture: ComponentFixture<RuchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuchersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
