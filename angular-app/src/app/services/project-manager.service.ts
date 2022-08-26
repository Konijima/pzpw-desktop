import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IpcRenderer } from '../typings/IpcRenderer';
import { IProject } from '../typings/IProject';

declare const ipcRenderer: IpcRenderer;

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  public readonly Projects: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);
  public readonly Initializing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly Initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly OpenedProject: Subject<IProject> = new Subject<IProject>();
  
  constructor() {
    this.requestProjects()
      .then(_ => {
        this.Initializing.next(false);
        this.Initialized.next(true);
      })
      .catch(() => {
        this.Initializing.next(false);
      });
  }

  /**
   * Request projects from electron renderer process
   */
  public async requestProjects() {
    ipcRenderer.invoke('requestProjects')
      .then((projects: IProject[]) => {
        this.Projects.next(projects);
      });
  }

  /**
   * Get a project from predicate function
   * @param predicate 
   * @returns 
   */
  public getProjectBy(predicate: (project: IProject) => boolean): IProject | undefined {
    return this.Projects.value.find(p => predicate(p));
  }

  /**
   * Open project dialog
   */
  public openProject() {
    ipcRenderer.invoke('openProject')
      .then((project: IProject) => {
        if (project) {
          const projects = [...this.Projects.value];
          projects.push(project);
          this.Projects.next(projects);
          this.OpenedProject.next(project);
        }
      });
  }

  /**
   * Open file browser to path
   */
  public openDirectory(path: string) {
    ipcRenderer.invoke('openDirectory', path);
  }

  /**
   * Open external web page to url
   */
  public openWebPage(url: string) {
    ipcRenderer.invoke('openWebPage', url);
  }

}
