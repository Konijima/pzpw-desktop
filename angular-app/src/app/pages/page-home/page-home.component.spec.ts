import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingOverlayComponent } from 'src/app/components/ui/loading-overlay/loading-overlay.component';

import { PageHomeComponent } from './page-home.component';

describe('PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PageHomeComponent,
        LoadingOverlayComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create page', () => {
    expect(component).toBeTruthy();
  });
});
