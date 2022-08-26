import { Component, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { IProject } from 'src/app/typings/IProject';

@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss']
})
export class PageProjectComponent implements OnDestroy {

  public project: IProject | undefined;

  private routeChangeSub: Subscription;

  constructor(
    private projectManager: ProjectManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.routeChangeSub = this.route.params.subscribe(_ => {
      const filePath = this.route.snapshot.paramMap.get('filePath') || undefined;

      this.project = this.projectManager.getProjectBy(p => p.filePath === filePath);
      
      if (!this.project) {
        this.ngZone.run(_ => this.router.navigate(['']));
      }
    });
  }

  ngOnDestroy() {
    this.routeChangeSub?.unsubscribe();
  }

}
