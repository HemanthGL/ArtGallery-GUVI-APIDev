import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtViewComponent } from './art-view.component';

describe('ArtViewComponent', () => {
  let component: ArtViewComponent;
  let fixture: ComponentFixture<ArtViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtViewComponent]
    });
    fixture = TestBed.createComponent(ArtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
