import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable({
  providedIn:'root'
})
export class CalendarService {
  constructor(private afs:AngularFirestore){
  }

  saveEvent(event){
    return this.afs.collection('events').doc(event.id.toString()).set(event)
  }

  getEvents(uid){
    return this.afs.collection('events', ref => ref.where('uid', '==', uid)).valueChanges()
  }

  deleteEvent(id){
    return this.afs.collection('events').doc(id.toString()).delete()
  }



}

