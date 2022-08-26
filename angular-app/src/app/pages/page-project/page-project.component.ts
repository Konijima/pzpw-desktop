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

  private project: IProject | undefined;

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

  getTitle() {
    return this.project?.pzpwConfigJson.workshop.title;
  }

  getWorkshopID() {
    const id = this.project?.pzpwConfigJson.workshop.id;
    return (id && id > 0) ? id : undefined;
  }

  getHomepage() {
    return this.project?.packageJson.homepage;
  }

  getFilePath() {
    return this.project?.filePath || '';
  }

  getDependencies() {
    const deps = [];
    for (let dep of Object.entries(this.project?.packageJson.dependencies)) {
      deps.push(dep);
    }
    return deps;
  }

  printModNames() {
    const mods = this.project?.pzpwConfigJson.mods;
    if (mods) {
      return Object.values(mods).map(p => p.name).join(', ');
    }
    else return '<no mod(s)>';
  }

  printAuthors() {
    const authors = this.project?.pzpwConfigJson.workshop.author;
    return (Array.isArray(authors)) ? authors.join(', ') : authors;
  }

  printKeywords() {
    return (this.project?.packageJson.keywords) ? this.project?.packageJson.keywords.join(', ') : undefined;
  }

  openDirectory(path: string) {
    this.projectManager.openDirectory(path);
  }

  openWebPage(url: string) {
    this.projectManager.openWebPage(url);
  }
}
