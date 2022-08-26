import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { PageProjectComponent } from './page-project.component';

describe('PageProjectComponent', () => {
  let component: PageProjectComponent;
  let fixture: ComponentFixture<PageProjectComponent>;
  let service: ProjectManagerService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PageProjectComponent
      ]
    })
    .compileComponents();

    service = TestBed.inject(ProjectManagerService);
    route = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(PageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create page', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect on ngOnInit with invalid project', () => {
    route.snapshot.params = { filePath: 'test' };

    component.ngOnInit();

    expect(component.project).toBeUndefined();
  });

  it('should not redirect on ngOnInit with valid project', () => {
    service.Projects.next([ { filePath: 'test' } as any ]);

    route.snapshot.params = { filePath: 'test' };

    component.ngOnInit();

    expect(component.project).toBeTruthy();
  });
});
