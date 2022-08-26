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
    service.Projects.next([ { filePath: 'test' } as any ]);

    route = TestBed.inject(ActivatedRoute);
  });

  it('should create page', () => {
    fixture = TestBed.createComponent(PageProjectComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should have an invalid project', () => {
    fixture = TestBed.createComponent(PageProjectComponent);
    component = fixture.componentInstance;

    /** @ts-ignore */
    expect(component.project).toBeUndefined();
  });

  it('should have a valid project', () => {
    route.snapshot.params = { filePath: 'test' };

    fixture = TestBed.createComponent(PageProjectComponent);
    component = fixture.componentInstance;

    /** @ts-ignore */
    expect(component.project).toBeTruthy();
  });
});
