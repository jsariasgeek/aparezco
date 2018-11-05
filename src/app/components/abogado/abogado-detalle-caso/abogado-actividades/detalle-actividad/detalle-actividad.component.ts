import { ActivitiesService } from './../../../../../services/activities.service';
import { RequestsService } from './../../../../../services/requests.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector:'app-detalle-actividad',
  templateUrl:'./detalle-actividad.component.html',
  styleUrls:['./detalle-actividad.component.css']
})
export class DetalleActividadComponent implements OnInit {

  id;
  activityId;
  activity;
  isCollapsed = false;
  comentario:string;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private reqSvc:RequestsService,
              public actsService:ActivitiesService){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        this.activityId = params['activityId'];
      }
    )

    this.reqSvc.getActivity(this.id, this.activityId).subscribe(
      (activity)=>{
        this.activity = activity;
      }
    )
    // this.activity$ = this.reqSvc.getActivity(this.id, this.activityId)

  }

  updateActivity(id, activity){
    this.actsService.updateActivity(id, activity).then(
      ()=>{
        console.log('Actualicé la actividad');
        this.router.navigate([`/abogado/casos/${this.id}/actividades`]);
      }
    )
  }

  deleteActivity(id, activityId){
    this.actsService.deleteActivity(id, activityId).then(
      ()=>{
        console.log('Borré la actividad');
        this.router.navigate([`/abogado/casos/${this.id}/actividades`]);

      }
    )
  }

  saveComentario(){
    console.log(this.comentario);
    this.comentario = '';
  }

}
