import { Component, Input } from '@angular/core';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { IProject } from 'src/app/typings/IProject';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent {

  @Input() projects!: IProject[];

  constructor(
    private projectManager: ProjectManagerService
  ) { }

  openProject() {
    this.projectManager.openProject();
  }

}
