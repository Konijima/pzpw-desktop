import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayComponent;
  let fixture: ComponentFixture<LoadingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingOverlayComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have class visible', () => {
    component.visible = true;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.visible');

    expect(element).toBeTruthy();
  });

  it('should not have class visible', () => {
    component.visible = false;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.visible');

    expect(element).toBeFalsy();
  });
});
