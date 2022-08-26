import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ListProjectsComponent } from './components/projects/list-projects/list-projects.component';
import { LoadingOverlayComponent } from './components/ui/loading-overlay/loading-overlay.component';
import { MaterialModule } from './material.module';
import { ProjectManagerService } from './services/project-manager.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let service: ProjectManagerService;

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

    service = TestBed.inject(ProjectManagerService);

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create app', () => {
    expect(app).toBeTruthy();
  });

  it('should call IsInitialized and return false', () => {
    const result = app.IsInitialized();
    expect(result).toBeFalse();
  });

  it('should call IsInitialized and return true', () => {
    service.Initialized.next(true);

    const result = app.IsInitialized();
    expect(result).toBeTrue();
  });

  it('should call GetProjects and return empty array', () => {
    service.Projects.next([{} as any]);

    const result = app.GetProjects();
    expect(result).toHaveSize(1);
  });
});
