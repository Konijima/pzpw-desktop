import { TestBed } from '@angular/core/testing';
import { IProject } from '../typings/IProject';

import { ProjectManagerService } from './project-manager.service';

describe('ProjectManagerService', () => {
  let service: ProjectManagerService;

  const mockupProject: IProject = {
    filePath: 'test',
    packageJson: {} as any,
    pzpwConfigJson: {} as any
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectManagerService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should call requestProjects function and throw a ReferenceError', (done) => {
    service.requestProjects().catch((error) => {
      expect(error instanceof ReferenceError).toBeTrue();
      done();
    });
  });

  it('should get Projects and return an empty array', () => {
    expect(service.Projects.value).toHaveSize(0);
  });

  it('should get Projects first value and return a project', () => {
    service.Projects.next([mockupProject]);

    expect(service.Projects.value[0]).toEqual(mockupProject);
  });

  it('should call getProjectBy function and return a project', () => {
    service.Projects.next([mockupProject]);

    const project = service.getProjectBy((p: IProject) => p && p.filePath == 'test');

    expect(project).toEqual(mockupProject);
  });

  it('should call getProjectBy function and return undefined', () => {
    const project = service.getProjectBy((p: IProject) => p && p.filePath == 'test');

    expect(project).toEqual(undefined);
  });
});
