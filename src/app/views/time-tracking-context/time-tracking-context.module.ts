import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { PersonalCalendarComponent } from './personal-calendar/personal-calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { CompanyCalendarComponent } from './company-calendar/company-calendar.component';


const routes: Routes = [
  {
    path: 'client',
    children: [{
      path: '',
      component: ClientComponent,
    },{
      path: ':id',
      component: ClientEditComponent,
    }]
  },
  {
    path: 'project',
    children: [{
      path: '',
      component: ProjectComponent,
    },{
      path: ':id',
      component: ProjectEditComponent,
    }]
  },
  {
    path: 'task',
    children: [{
      path: '',
      component: TaskComponent,
    },{
      path: ':id',
      component: TaskEditComponent,
    }]
  },
  {
    path: 'calendar',
    children: [{
      path: 'my-calendar',
      component: PersonalCalendarComponent
    }, {
      path: 'company-calendar',
      component: CompanyCalendarComponent
    }]
  }
]

@NgModule({
  declarations: [
    ClientComponent,
    ProjectComponent,
    TaskComponent,
    ClientEditComponent,
    ProjectEditComponent,
    TaskEditComponent,
    PersonalCalendarComponent,
    CompanyCalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FullCalendarModule,
  ]
})
export class TimeTrackingContextModule { }
