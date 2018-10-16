import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable} from "rxjs";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  user:Observable<firebase.User>;
  currentUser:firebase.User;

  messaging = firebase.messaging();

  constructor(public afAuth:AngularFireAuth, public afDB:AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe((user:firebase.User)=>{
      // console.log(user);
      this.currentUser = user;
    })
  }


  saveMessagingDeviceToken(){
    return this.messaging.getToken()
      .then((currentToken)=>{
        if(currentToken){
          // console.log('Got FCM device token:', currentToken);
          this.afDB.database
            .ref('/fcmTokens')
            .child(currentToken)
            .set(this.currentUser.uid);
        }
        else{
          return this.getPermission()
        }
      }).catch((err)=>{
        // console.log('Unable to get messging token')
        // console.log('error');
      })
  }

 getPermission(){
    // console.log('Requesting notifications permission');
    return this.messaging.requestPermission()
      .then(()=>{
        this.saveMessagingDeviceToken()
      }).catch((err)=>{
        // console.log('Unable to get permission to nofify');
        // console.log(err);
      })
 }

}
