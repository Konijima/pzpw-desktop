import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { LoadingOverlayComponent } from './components/ui/loading-overlay/loading-overlay.component';
import { ListProjectsComponent } from './components/projects/list-projects/list-projects.component';
import { ItemProjectComponent } from './components/projects/item-project/item-project.component';

// Pages
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageProjectComponent } from './pages/page-project/page-project.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Services
import { ProjectManagerService } from './services/project-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingOverlayComponent,
    ListProjectsComponent,
    ItemProjectComponent,
    PageHomeComponent,
    PageProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ProjectManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
