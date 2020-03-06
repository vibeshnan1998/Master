import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaknotsComponent } from './seaknots.component';

describe('SeaknotsComponent', () => {
  let component: SeaknotsComponent;
  let fixture: ComponentFixture<SeaknotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeaknotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaknotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
