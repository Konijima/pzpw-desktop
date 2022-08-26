import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { IProject } from 'src/app/typings/IProject';

@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss']
})
export class PageProjectComponent implements OnInit {

  public project: IProject | undefined;

  constructor(
    private projectManager: ProjectManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    const filePath = this.route.snapshot.paramMap.get('filePath') || undefined;
    this.project = this.projectManager.getProjectBy(p => p.filePath === filePath);
    if (!this.project) {
      this.ngZone.run(_ => this.router.navigate(['']));
    }
  }

}
