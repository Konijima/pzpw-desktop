import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';

import { ItemProjectComponent } from './item-project.component';

describe('ItemProjectComponent', () => {
  let component: ItemProjectComponent;
  let fixture: ComponentFixture<ItemProjectComponent>;
  let title: HTMLElement;
  let filePath: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      declarations: [
        ItemProjectComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProjectComponent);
    component = fixture.componentInstance;
    
    // Mockup project
    component.project = {
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

    fixture.detectChanges();

    title = fixture.nativeElement.querySelector('h1');
    filePath = fixture.nativeElement.querySelector('h2');
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display project workshop title', () => {
    expect(title.textContent).toContain(component.project.pzpwConfigJson.workshop.title);
  });

  it('should display project filePath', () => {
    expect(filePath.textContent).toContain(component.project.filePath);
  });
});
