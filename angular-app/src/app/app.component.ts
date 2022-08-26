import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagerService } from './services/project-manager.service';
import { IProject } from './typings/IProject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private projectManager: ProjectManagerService
  ) {
    this.projectManager.OpenedProject.subscribe((project: IProject) => {
      this.router.navigate(['project', project.filePath]);
    });
  }

  IsInitialized() {
    return this.projectManager.Initialized.value;
  }

  GetProjects() {
    return this.projectManager.Projects.value;
  }

}
