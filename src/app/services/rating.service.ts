import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Rating} from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private afDB:AngularFireDatabase) {}


  public sendRating(rating:Rating){
    return this.afDB.database.ref('ratings/'+rating.id).set(rating)
  }

}
