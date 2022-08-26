import { Component, Input } from '@angular/core';
import { IProject } from 'src/app/typings/IProject';

@Component({
  selector: 'app-item-project',
  templateUrl: './item-project.component.html',
  styleUrls: ['./item-project.component.scss']
})
export class ItemProjectComponent {

  @Input() project!: IProject;

  constructor() { }

}
