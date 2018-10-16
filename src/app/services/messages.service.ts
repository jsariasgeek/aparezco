import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private afDB:AngularFireDatabase) {}

  sendMessage(message){
    this.afDB.database.ref('messages/'+message.id).set(message);
  }

  getMessages(){
    return this.afDB.list('messages/');
  }

}
