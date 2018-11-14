import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from "@angular/core";
import { NgbDateAdapter, NgbModalModule, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from './demo-utils/module';
import { RouterModule, Routes } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const calendarRoutes:Routes = [
  { path: '', component: CalendarComponent }
]

@NgModule({
  declarations:[
    CalendarComponent,
  ],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(calendarRoutes),
    CalendarModule.forRoot({
      provide:DateAdapter,
      useFactory:adapterFactory
    }),
    DemoUtilsModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbDropdownModule,
  ],
  exports:[
    RouterModule
  ]

})
export class CalendarioModule {}
