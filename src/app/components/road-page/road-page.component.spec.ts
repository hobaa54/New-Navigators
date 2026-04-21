import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadPageComponent } from './road-page.component';

describe('RoadPageComponent', () => {
  let component: RoadPageComponent;
  let fixture: ComponentFixture<RoadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
