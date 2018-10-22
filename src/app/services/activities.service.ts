import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// Angular fire imports
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private afDB:AngularFireDatabase, private afs:AngularFirestore) {}

  saveActivity(requestId, activity){
    // return this.afs.collection('requests').doc(requestId.toString()).update({
    //   activities:firebase.firestore.FieldValue.arrayUnion(activity)
    // })
    return this.afs.collection('requests').doc(requestId.toString())
    .collection('activities').doc(activity.id.toString()).set(activity)
  }

  getActivitiesbyRequest(requestId){
    // console.log('Me llegó este Id');
    // console.log(requestId);
    // return this.afDB.list('/activities', ref =>
    // ref.orderByChild('requestId').equalTo(requestId.toString()));
    return this.afs.collection('requests').doc(requestId.toString()).collection('activities'
    , ref => ref.orderBy('id','desc'))
    .valueChanges()
  }

  // getActivityById(id){
  //   return this.afs.collection.
  // }

  updateActivity(requestId, activity){
    // this.afDB.database.ref('activities/'+activity.id).set(activity).then(
    //   ()=> console.log('Actualice la actividad')
    // )
    // return this.afs.collection('requests').doc(requestId.toString()).update({
    //   activities:firebase.firestore.FieldValue.arrayUnion(activity)
    // })
    return this.afs.collection('requests').doc(requestId.toString()).collection('activities')
    .doc(activity.id.toString()).update(activity)
  }

  deleteActivity(requestId, activityId){
    return this.afs.collection('requests').doc(requestId.toString()).collection('activities').doc(activityId.toString()).delete()
  }

  // saveComentario(requestId, activityId, comentario){
  //   return this.afs.collection('requests').doc(requestId)
  //   .collection('activities').doc(activity.id).update({})
  // }



}
