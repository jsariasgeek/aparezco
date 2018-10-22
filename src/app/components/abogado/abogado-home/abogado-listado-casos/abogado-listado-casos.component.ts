import { LawyerAttending } from './../../../../models/lawyer-attending';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './../../../../services/auth.service';
import { RequestsService } from './../../../../services/requests.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route } from '@angular/router';
import { StatusQueue } from 'src/app/models/status-queue';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-abogado-listado-casos',
  templateUrl: './abogado-listado-casos.component.html',
  styleUrls: ['./abogado-listado-casos.component.css']
})
export class AbogadoListadoCasosComponent implements OnInit {

  status;

  statusCases = {
    'canceled':'Cancelados',
    'finished':'Finalizados',
    'assignedWorking':'En Proceso',
    'assignedOpen':'Abiertos'
  }

  //lawyer
  lawyer;


  incomingRequests;
  assignedRequests;
  addStatus:StatusQueue;
  filterActive;
  filtered;

  // filter = new BehaviorSubject(null);

  //Incoming Requests

  offset = 5;
  nextKeyBool;
  nextKey:any;
  prevKey:any;
  prevKeys:any[] = [0,];

  //Cases
  offsetCases = 6;
  thereIsMoreCases = false;
  nextCase;
  prevKeyCase:any;
  prevKeysCases:any[] = [0,];


  constructor(private route:ActivatedRoute,
              private router:Router,
              private reqService:RequestsService,
              private authService:AuthService,
              private afs:AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        //Updating Global Vars
        this.offsetCases = 6;
        this.thereIsMoreCases = false;
        this.nextCase = null;
        this.prevKeyCase = null;
        this.prevKeysCases = [0,];
        //updating

        this.status = params['status']
        if(this.status == 'waitingLawyer'){
          // console.log('Status Waiting Lawyer');
          this.getIncomingRequests();
        }else{
          this.filterCases(this.status);
        }
      }
    )

    //Get Incoming Requests

    this.authService.getUserProfile(this.authService.getUid())
    .valueChanges()
    .subscribe(
      (userProfile)=>{
        this.lawyer = userProfile;
      }
    )
  }

  getIncomingRequests(key?) {
    this.reqService.getIncomingRequests(this.offset, key).subscribe(
      (incomingRequests)=>{
        // console.log('incomingRequests', incomingRequests);
        // console.log(incomingRequests.length);
        this.incomingRequests = incomingRequests;
        // this.incomingRequests = _.slice(incomingRequests, 0, this.offset)
        if(incomingRequests.length>=1){
          this.nextKey = incomingRequests[incomingRequests.length-1].id;
        }


        this.reqService.getIncomingRequests(this.offset, this.nextKey).subscribe(
          (requests)=>{
            // console.log('Length del');
            // console.log(requests.length);
            this.nextKeyBool = requests.length>=1 ? true : false;
            // console.log(this.nextKeyBool);
          }
        )
        }
    )


  }

  filterCases(status, startKey?) {

    let startAt = startKey && startKey !== 0 ? startKey : null;
    // console.log('Start At', startAt);

    // if(startKey && startKey!==0) {
    //   startAt = startKey
    // }else{
    //   startAt = null
    // }

    this.reqService.getRequestsForUser(status, this.offsetCases, startAt).subscribe(
      (requests)=>{
        // console.log('Requests', requests, requests.length);
        this.filtered = requests.slice(0, this.offsetCases-1)
        // console.log('Filtered', this.filtered, this.filtered.length);
        if(requests.length >= 1) {
          this.nextCase = requests[requests.length-1].id;
        }
        // console.log('Next Case', this.nextCase)
        if(requests.length > this.filtered.length){
          this.thereIsMoreCases = true;
        }else{
          this.thereIsMoreCases = false;
        }
        // console.log('There is more Cases?', this.thereIsMoreCases);
      }
    )
  }

  nextPage() {
    this.prevKeys.push(this.nextKey)
    // console.log(this.prevKeys);
    this.prevKey = this.nextKey
    this.getIncomingRequests(this.nextKey)

  }
  prevPage() {
    this.prevKey = this.prevKeys[this.prevKeys.length-2]
    // console.log(this.prevKey);
    this.prevKeys = _.dropRight(this.prevKeys)
    this.getIncomingRequests(this.prevKey)
  }

  nextPageCases() {
    this.prevKeysCases.push(this.nextCase)
    // console.log(this.prevKeysCases);
    this.prevKeyCase = this.prevKeysCases[this.prevKeysCases.length-2]
    // console.log('Prev Case', this.prevKeyCase);
    this.filterCases(this.status, this.nextCase)

  }

  prevPageCases() {
    this.prevKeyCase = this.prevKeysCases[this.prevKeysCases.length-2]
    // console.log('Prev Case', this.prevKeyCase);
    this.prevKeysCases = _.dropRight(this.prevKeysCases)
    this.filterCases(this.status, this.prevKeyCase)
  }

  goToChat(id){

    const requestRef = this.afs.collection('requests').doc(id.toString())

    const userFirstAssigned:LawyerAttending = {
      uid:this.authService.getUid(),
      name:this.lawyer.name,
      email:this.lawyer.email
    }

     const statusQueue:StatusQueue = {
      id:Date.now(),
      text:'assignedOpen',
      user:this.authService.getUid()
    }

    requestRef.update({
      status:'assignedOpen',
      userFirstAssigned:userFirstAssigned,
      statusQueue:firebase.firestore.FieldValue.arrayUnion(statusQueue)
    })

    this.router.navigate(['/abogado/chat', {request:id}]);


  }


}




