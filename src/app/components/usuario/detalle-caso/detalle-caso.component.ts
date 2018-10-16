import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {Solicitud} from '../../../models/solicitud';
import {Message} from '../../../models/message';
import {Activity} from '../../../models/activity';
import {ActivitiesService} from '../../../services/activities.service';

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.css']
})
export class DetalleCasoComponent implements OnInit {

  id: number;
  request:Solicitud;
  messages:Message[];
  activities:Activity[];

  constructor(private route: ActivatedRoute, private reqService: RequestsService, private actsService:ActivitiesService) { }

  ngOnInit() {
    this.route.params.subscribe(
          (params: Params) => {
            this.id = params['id'];
            console.log('Este es el id que me llegó');
            console.log(this.id);
            this.reqService.getRequest(this.id).valueChanges()
              .subscribe(
                (request: Solicitud) => {
                  this.request = request;
                  this.messages = request.messages;

                  console.log('Este es el request');
                  console.log(this.request);
                }
              );

            this.actsService.getActivitiesbyRequest(this.id).subscribe(
              (activities:Activity[])=>{
                this.activities = activities;
              }
            )
          }
        );


  }

}
