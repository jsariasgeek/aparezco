import { auth } from 'firebase';
import { AuthService } from './../../../../services/auth.service';
import { CalendarService } from './../calendar.service';
import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal, NgbDate, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { FormControl, NgForm } from '@angular/forms';
import { switchMap, map, mapTo } from 'rxjs/operators';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
}





@Component({
  selector: 'app-calendario',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  tituloEvento:string;
  view: string = 'month';
  closeResult: string;

  startDate:NgbDate = new NgbDate(
    new Date().getFullYear(),
    new Date().getMonth()+1,
    new Date().getDate(),
    );
  endDate:NgbDate = new NgbDate(
      new Date().getFullYear(),
      new Date().getMonth()+1,
      new Date().getDate(),
      );

  startTime:FormControl;
  endTime:FormControl;

  times = [
    {name:'08:00am', time: '08:00'},
    {name:'08:30am', time: '08:30'},
    {name:'09:00am', time: '09:00'},
    {name:'09:30am', time: '09:30'},
    {name:'10:00am', time: '10:00'},
    {name:'10:30am', time: '10:30'},
    {name:'11:00am', time: '11:00'},
    {name:'11:30am', time: '11:30'},
    {name:'12:00pm', time: '12:00'},
    {name:'12:30pm', time: '12:30'},
    {name:'01:00pm', time: '13:00'},
    {name:'01:30pm', time: '13:30'},
    {name:'02:00pm', time: '14:00'},
    {name:'02:30pm', time: '14:30'},
    {name:'03:00pm', time: '15:00'},
    {name:'03:30pm', time: '15:30'},
    {name:'04:00pm', time: '16:00'},
    {name:'04:30pm', time: '16:30'},
    {name:'05:00pm', time: '17:00'},
    {name:'05:30pm', time: '17:30'},
    {name:'06:00pm', time: '18:00'},
    {name:'06:30pm', time: '18:30'},
    {name:'07:00pm', time: '19:00'},
    {name:'07:30pm', time: '19:30'},
    {name:'08:00pm', time: '20:00'},
    {name:'08:30pm', time: '20:30'},
    {name:'09:00pm', time: '21:00'},
    {name:'09:30pm', time: '21:30'},
    {name:'10:00pm', time: '22:00'},
    {name:'10:30pm', time: '22:30'},
    {name:'11:00pm', time: '23:00'},
    {name:'11:30pm', time: '23:30'},
    {name:'12:00am', time: '00:00'},
    {name:'12:30am', time: '00:30'},
    {name:'01:00am', time: '01:00'},
    {name:'01:30am', time: '01:30'},
    {name:'02:00am', time: '02:00'},
    {name:'02:30am', time: '02:30'},
    {name:'03:00am', time: '03:00'},
    {name:'03:30am', time: '03:30'},
    {name:'04:00am', time: '04:00'},
    {name:'04:30am', time: '04:30'},
    {name:'05:00am', time: '05:00'},
    {name:'05:30am', time: '05:30'},
    {name:'06:00am', time: '06:00'},
    {name:'06:30am', time: '06:30'},
    {name:'07:00am', time: '07:00'},
    {name:'07:30am', time: '07:30'},
  ];



modalData: {
  action: string;
  event: CalendarEvent;
};

hours = new Date().getHours();
amOrPm = this.hours >= 12 ? 'pm':'am';

  modalContent: TemplateRef<any>;
  @ViewChild('content') content;
  @ViewChild('inputStartTime') inputStartTime:HTMLInputElement;
  @ViewChild('inputEndTime') inputEndTime;
  @ViewChild('f') f:NgForm;
  // @ViewChild('endTime') endTime;


  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  eventsCalendar;
  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // },
    // {
    //   start: new Date(),
    //   end: new Date(),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true
    // },
    // {
    //   start: new Date(),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  clickedDate: Date;
  lawyerUid;

  constructor(private modalService: NgbModal,
              config:NgbDropdownConfig,
              private cSvc:CalendarService,
              private authSvc:AuthService) {
    config.placement = 'bottom-right';
    config.autoClose = false;

    if(this.hours > 12){
      this.hours -= 12
    }else if (this.hours === 0){
      this.hours = 12;
    }


  }

  ngOnInit(){
    this.startTime = new FormControl(this.hours.toString().padStart(2, '0')+':'+'00'+ this.amOrPm);
    this.endTime = new FormControl(this.hours.toString().padStart(2, '0')+':'+'00'+ this.amOrPm);
    // this.getUid()

    this.authSvc.isLogged()
    .subscribe(
      user => {
        if(user && user.uid){
          this.lawyerUid = user.uid;
          this.cSvc.getEvents(user.uid)
          // .pipe(
          //   map(event:CalendarEvent => {start:new Date(event.start)})
          // )
          .subscribe(
            (events:CalendarEvent[]) => {
              console.log(events);
              this.events = events
            }
          )
        }
      }
    )

    // this.cSvc.getEvents(this.lawyerUid).subscribe(
    //   (events)=>{
    //     this.eventsCalendar = events
    //   }
    // )

  }

  // async getUid(){
  //   this.lawyerUid = await this.authSvc.getUid();
  // }

  dayClicked($event){
    console.log('Clicked');
    console.log($event);
    const date = $event.day.date;
    this.startDate = this.endDate = new NgbDate(
      date.getFullYear(),
      date.getMonth()+1,
      date.getDate()
    )

    this.open(this.content);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  setTime(input, value){
    if(input == 'endTime'){
      this.endTime.setValue(value);
    }
    if(input == 'startTime'){
      this.startTime.setValue(value);
    }
  }

  async saveEvent(f){

    const startHours = parseInt(this.startTime.value.split(':')[0])
    const startAmOrPm = this.startTime.value.slice(-2)

    const endHours = parseInt(this.startTime.value.split(':')[0])
    const endAmOrPm = this.startTime.value.slice(-2)


    const extractTimeFormat = timeValue => timeValue.value.split('').slice(-2).join('')

    const convertedHours = (hours, timeFormat:String) => {
      if(timeFormat == 'pm'){
        return hours += 12
      }
      return hours
    }

    // const convertTimeTwelveHoursFormat = (timeValue) => {
    //   return timeValue.split('')[].slice(-2)
    // }

    // console.log(convertTimeTwelveHoursFormat(this.startTime));

    // const event = {
    //   uid:this.lawyerUid,
    //   title:this.tituloEvento,
    //    start:{
    //     year:this.startDate.year,
    //     month:this.startDate.month-1,
    //     day:this.startDate.day,
    //     hours:convertedHours(startHours, startAmOrPm),
    //     minutes:this.startTime.value.split(':')[1].split('').slice(0,2).join(''),
    //   },
    //   end:{
    //     year:this.endDate.year,
    //     month:this.endDate.month-1,
    //     day:this.endDate.day,
    //     hours:convertedHours(endHours, endAmOrPm),
    //     minutes:this.endTime.value.split(':')[1].split('').slice(0,2).join(''),
    //   }
    // }

    const event = {
      uid:this.lawyerUid,
      title:this.tituloEvento,
       start: new Date(
        this.startDate.year,
        this.startDate.month-1,
        this.startDate.day,
        convertedHours(startHours, startAmOrPm),
        this.startTime.value.split(':')[1].split('').slice(0,2).join(''),
       ).getTime(),
      end:new Date(
        this.endDate.year,
        this.endDate.month-1,
        this.endDate.day,
        convertedHours(endHours, endAmOrPm),
        this.endTime.value.split(':')[1].split('').slice(0,2).join(''),
      ).getTime()
    }

    console.log(event);


    await this.cSvc.saveEvent(event)

    console.log('Event Saved');
    this.tituloEvento = '';




  }


}
