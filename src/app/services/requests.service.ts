import { Solicitud } from './../models/solicitud';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Message } from '../models/message';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private afDB:AngularFireDatabase, private authService:AuthService, private afs:AngularFirestore) {}

  sendRequest(request){
    // this.afDB.database.ref('requests/'+request.id).set(request);
    // console.log('Guardé en Firebase');
    return this.afs.collection<Solicitud>('requests').doc(request.id.toString()).set(request)

  }

  saveMessagesIntoRequest(requestId, message){
    // return this.afs.collection<Solicitud>('requests').doc(requestId.toString()).collection<Message>('messages').
    // doc(message.id.toString()).set(message);
    return this.afs.collection<Solicitud>('requests').doc(requestId.toString()).update({
      messages:firebase.firestore.FieldValue.arrayUnion(message),
    })
  }

  getRequest(id){
    return this.afs.doc(`requests/${id}`)
    // return this.afDB.object('requests/'+ id);
  }

  // sendMessage(requestId, message){
  //   return this.afDB.database.ref('requests/'+requestId+'/messages/').set(message);
  // }

  getIncomingRequests(offset, startKey?){
    // return this.afDB.list('/requests', ref =>
    // ref.orderByChild('status').equalTo('open'))
    const startAt = startKey || 0;
    return this.afs.collection<Solicitud>('requests', ref =>
    ref.where('status', '==', 'waitingLawyer').orderBy('id').startAfter(startAt).limit(offset)).valueChanges()
  }

  getRequestsForUser(status, offset, startKey?) {
    // console.log('Status', status);
    // console.log('offset', offset);
    // console.log('startAt', startKey);
    // const startAt = startKey || 0;
    let uid = this.authService.getUid()
    // console.log('Requesting at StartKey', startKey)
    if(startKey && startKey !=null){
      // console.log('Voy a hacer el query con startat');
      return this.afs.collection<Solicitud>('requests', ref =>
      ref.where('userFirstAssigned.uid', '==', uid).where('status', '==', status)
      .orderBy('id', 'desc').startAt(startKey).limit(offset)).valueChanges()
    }else{
      // console.log('Voy a hacer el query sin startat con status', status);
      return this.afs.collection<Solicitud>('requests', ref =>
      ref.where('userFirstAssigned.uid', '==', uid).where('status', '==', status)
      .orderBy('id', 'desc').limit(offset)).valueChanges()
    }

  }

  getAssignedRequestsToTheUser(uid){
    console.log('UID');
    console.log(uid);
    return this.afs.collection<Solicitud>('requests', ref => ref.where('userFirstAssigned.uid', '==', uid)).valueChanges()
    // return this.afDB.list('/requests', ref =>
    //   ref.orderByChild('userFirstAssigned/uid').equalTo(uid)
    // )
  }


  // getOpenRequestsForUser(uid){
  //   console.log('UID');
  //   console.log(uid);
  //   return this.afs.collection<Solicitud>('requests', ref => ref.where('userFirstAssigned.uid', '==', uid).where('status','==', 'assignedOpen')).valueChanges()
  //   // return this.afDB.list('/requests', ref =>
  //   //   ref.orderByChild('userFirstAssigned/uid').equalTo(uid)
  //   // )
  // }

  // getOpenRequestsForUser(uid) {
  //   let requestsRef = this.afs.collection('requests').ref
  //   return requestsRef.where('userFirstAssigned.uid', '==', uid).where('status', '==', 'assignedOpen')
  // }

  public getUsers(){
    return this.afDB.list('/users')
  }

  public getUserAssigned(uid){
    return this.afDB.object('users/'+uid);
  }

  public getRequestsByEmail(email){
    return this.afDB.list('requests/', ref =>
    ref.orderByChild('email').equalTo(email))
  }

  public saveProspecto(prospecto){
    return this.afs.collection('prospectos').add(prospecto);
  }

  getActivity(requestId, activityId){
    return this.afs.collection('requests').doc(requestId).collection('activities')
    .doc(activityId).valueChanges()
  }


}



