import { Component } from '@angular/core';
import { ProjectManagerService } from './services/project-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public projectManager: ProjectManagerService
  ) { }

}
