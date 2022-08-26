import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { IProject } from 'src/app/typings/IProject';
import { ItemProjectComponent } from '../item-project/item-project.component';

import { ListProjectsComponent } from './list-projects.component';

describe('ListProjectsComponent', () => {
  let component: ListProjectsComponent;
  let fixture: ComponentFixture<ListProjectsComponent>;
  let items: HTMLElement[];

  const mockup: IProject = {
    filePath: 'filePath',
    packageJson: {},
    pzpwConfigJson: {
      mods: {
        test: {
          name: 'modtest',
          description: ''
        }
      },
      workshop: {
        title: 'titletest',
        visibility: 'public',
        tags: [],
        mods: []
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        ListProjectsComponent,
        ItemProjectComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectsComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have no items', () => {
    component.projects = [];

    fixture.detectChanges();

    items = fixture.nativeElement.querySelectorAll('app-item-project');

    expect(items.length).toEqual(0);
  });

  it('should have 3 items', () => {
    component.projects = [mockup, mockup, mockup];

    fixture.detectChanges();

    items = fixture.nativeElement.querySelectorAll('app-item-project');

    expect(items.length).toEqual(3);
  });
});
