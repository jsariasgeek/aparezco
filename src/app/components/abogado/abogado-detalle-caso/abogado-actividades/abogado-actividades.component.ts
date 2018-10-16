import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Solicitud} from '../../../../models/solicitud';
import {RequestsService} from '../../../../services/requests.service';
import {Message} from '../../../../models/message';
import {NgForm} from '@angular/forms';
import {Activity} from '../../../../models/activity';
import {ActivitiesService} from '../../../../services/activities.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-abogado-actividades',
  templateUrl: './abogado-actividades.component.html',
  styleUrls: ['./abogado-actividades.component.css'],
  providers:[NgbAccordionConfig]
})
export class AbogadoActividadesComponent implements OnInit {

  request:Solicitud;
  messages:Message[];
  id:number;

  activities = [];

  constructor(private route: ActivatedRoute,
    private reqService: RequestsService,
    private actsService:ActivitiesService,
    private config:NgbAccordionConfig) {
      config.closeOthers = true;
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log('Este es el id que me llegó');
        console.log(this.id);

        //Get The request
        this.reqService.getRequest(this.id).valueChanges()
          .subscribe(
            (request: Solicitud) => {
              this.request = request;
              this.messages = request.messages;

              // this.actsService.getActivitiesbyRequest(request.id).valueChanges()
              //   .subscribe(
              //     (activities:Activity[])=>{
              //       console.log(activities);
              //       this.activities = activities;
              //     }
              //   )

              console.log('Este es el request');
              console.log(this.request);
            }
          );

          //get the activities
          this.actsService.getActivitiesbyRequest(this.id).subscribe(
            (activities)=>{
              this.activities = activities;
            }
          )






      }
    );


  }

  saveActivity(f:NgForm){
    console.log('Vamos a guardar la actividad');
    console.log(f.controls.titulo.value);
    console.log(f.controls.caso.value);

    const activity:Activity  = {
      id:Date.now(),
      title:f.controls.titulo.value,
      content:f.controls.caso.value
    }
    console.log(activity);
    this.actsService.saveActivity(this.id, activity)
    f.reset()

  }

  deleteActivity(activityId){
    console.log('Voy a borrar la actividad');
    this.actsService.deleteActivity(this.request.id, activityId);
  }

  updateActivity(activity){
        this.actsService.updateActivity(this.request.id, activity);
      }

}
