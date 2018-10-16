import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Solicitud} from '../../../models/solicitud';
import {Message} from '../../../models/message';
import {StatusQueue} from "../../../models/status-queue";
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-abogado-detalle-caso',
  templateUrl: './abogado-detalle-caso.component.html',
  styleUrls: ['./abogado-detalle-caso.component.css']
})
export class AbogadoDetalleCasoComponent implements OnInit {

  id:number;
  request:Solicitud;
  requestStatus:string = '';
  messages:Message[];

  status = {
    assignedWorking:'En Curso',
    finished:'Finalizado',
    canceled:'No Prospectado'
  }


  constructor(private route: ActivatedRoute,
    private reqService: RequestsService,
    private afs:AngularFirestore,
    private router:Router) { }

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
              this.requestStatus = request.status;
              this.messages = request.messages;
              console.log('Este es el request');
              console.log(this.request);
            }
          );
      }
    );


  }

  closeCase(){

    const statusQueue:StatusQueue = {
      id:Date.now(),
      text:'finished',
      user:this.request.userFirstAssigned.uid

    }

    const requestRef = this.afs.collection('requests').doc(this.request.id.toString())
    requestRef.update({
      status:'finished',
      statusQueue:firebase.firestore.FieldValue.arrayUnion(statusQueue)
    }).then(
      ()=>{
        console.log('Guardé en Firebase');
      }
    ).catch(
      ()=>{
        console.log('Ocurrió un error al guardar el request en firebase');
      }
    )

    // this.request.statusQueue.push(new StatusQueue(
    //   Date.now(), 'finished', this.request.userFirstAssigned.uid
    // ));
    // this.request.status = 'finished';
    // this.reqService.sendRequest(this.request);
  }

  getClassByStatus(){
    if(this.requestStatus == 'finished'){
      return 'finished';
    }
    if(this.requestStatus == 'assignedWorking'){
      return 'assigned';
    }
    if(this.requestStatus == 'canceled'){
      return 'canceled'
    }
  }

  reOpenCase(){
    const requestRef = this.afs.collection('requests').doc(this.request.id.toString())
    const statusQueue:StatusQueue = {
      id:Date.now(),
      text:'assignedWorking',
      user:this.request.userFirstAssigned.uid
    }

    requestRef.update({
      status:'assignedWorking',
      statusQueue:firebase.firestore.FieldValue.arrayUnion(statusQueue)
    }).then(
      ()=>{
        console.log('guardé en firebase')
        // this.router.navigate(['/abogado']);
    }
    ).catch(
      ()=>{console.log('hubo un error al guardar en firebase')}
    )


    // this.request.statusQueue.push(new StatusQueue(
    //   Date.now(), 'assigned', this.request.userFirstAssigned.uid
    // ));
    // this.request.status = 'assigned';
    // this.reqService.sendRequest(this.request);
  }

  markNotProspected(){
    // this.request.statusQueue.push(new StatusQueue(
    //   Date.now(), 'canceled', this.request.userFirstAssigned.uid
    // ));
    // this.request.status = 'canceled'
    // this.reqService.sendRequest(this.request);

    const requestRef = this.afs.collection('requests').doc(this.request.id.toString())
    const statusQueue:StatusQueue = {
      id:Date.now(),
      text:'canceled',
      user:this.request.userFirstAssigned.uid
    }

    requestRef.update({
      status:'canceled',
      statusQueue:firebase.firestore.FieldValue.arrayUnion(statusQueue)
    }).then(
      ()=>{
        console.log('guardé en firebase');
        // this.router.navigate(['/abogado']);
      }
    ).catch(
      ()=>{console.log('hubo un error al guardar en firebase')}
    )



  }

}
