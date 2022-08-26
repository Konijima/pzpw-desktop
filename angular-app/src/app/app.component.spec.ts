import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ListProjectsComponent } from './components/projects/list-projects/list-projects.component';
import { LoadingOverlayComponent } from './components/ui/loading-overlay/loading-overlay.component';
import { MaterialModule } from './material.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        AppComponent,
        ListProjectsComponent,
        LoadingOverlayComponent
      ],
    }).compileComponents();
  });

  it('should create app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
