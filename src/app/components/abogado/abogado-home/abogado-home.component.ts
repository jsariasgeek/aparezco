import { map, switchMap } from 'rxjs/operators';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NotificationsService} from "../../../services/notifications.service";
import {RequestsService} from "../../../services/requests.service";
import {Router} from "@angular/router";
import {StatusQueue} from "../../../models/status-queue";
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from '../../../models/user-profile';
import {LawyerAttending} from '../../../models/lawyer-attending';
import { AngularFirestore } from 'angularfire2/firestore';
import { Solicitud } from '../../../models/solicitud';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { isNull } from 'util';

@Component({
  selector: 'app-abogado-home',
  templateUrl: './abogado-home.component.html',
  styleUrls: ['./abogado-home.component.css']
})
export class AbogadoHomeComponent implements OnInit, OnDestroy {

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



  constructor(private notiService:NotificationsService,
              private reqService:RequestsService,
              private authService:AuthService,
              private router:Router,
              private afs:AngularFirestore) {


    this.notiService.getPermission();



  }

  ngOnInit() {
    //Get Incoming Requests
    this.getIncomingRequests()
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
        // console.log(incomingRequests);
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

  filterCases(value, startKey?) {

    let startAt = startKey && startKey !== 0 ? startKey : null;
    console.log('Start At', startAt);

    // if(startKey && startKey!==0) {
    //   startAt = startKey
    // }else{
    //   startAt = null
    // }

    this.filterActive = value;
    this.reqService.getRequestsForUser(value, this.offsetCases, startAt).subscribe(
      (requests)=>{
        console.log('Requests', requests, requests.length);
        this.filtered = requests.slice(0, this.offsetCases-1)
        console.log('Filtered', this.filtered, this.filtered.length);
        this.nextCase = requests[requests.length-1].id;
        console.log('Next Case', this.nextCase)
        if(requests.length > this.filtered.length){
          this.thereIsMoreCases = true;
        }else{
          this.thereIsMoreCases = false;
        }
        console.log('There is more Cases?', this.thereIsMoreCases);
      }
    )
  }


  //Pagination
  nextPage() {
    this.prevKeys.push(this.nextKey)
    console.log(this.prevKeys);
    this.prevKey = this.nextKey
    this.getIncomingRequests(this.nextKey)

  }
  prevPage() {
    this.prevKey = this.prevKeys[this.prevKeys.length-2]
    console.log(this.prevKey);
    this.prevKeys = _.dropRight(this.prevKeys)
    this.getIncomingRequests(this.prevKey)
  }

  nextPageCases() {
    this.prevKeysCases.push(this.nextCase)
    console.log(this.prevKeysCases);
    this.prevKeyCase = this.prevKeysCases[this.prevKeysCases.length-2]
    console.log('Prev Case', this.prevKeyCase);
    this.filterCases(this.filterActive, this.nextCase)

  }

  prevPageCases() {
    this.prevKeyCase = this.prevKeysCases[this.prevKeysCases.length-2]
    console.log('Prev Case', this.prevKeyCase);
    this.prevKeysCases = _.dropRight(this.prevKeysCases)
    this.filterCases(this.filterActive, this.prevKeyCase)
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

  ngOnDestroy() {
    console.log('Ng On Destroy');
  }


}
