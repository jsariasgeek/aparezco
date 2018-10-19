import { AuthService } from './../../../services/auth.service';
import { map, switchMap, filter, debounceTime } from 'rxjs/operators';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NotificationsService} from "../../../services/notifications.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-abogado-home',
  templateUrl: './abogado-home.component.html',
  styleUrls: ['./abogado-home.component.css']
})
export class AbogadoHomeComponent implements OnInit {

  lawyer;
  searchField:FormControl;
  results:Observable<any[]>;
  offset = new Subject<string>();f
  results$;

  constructor(private notiService:NotificationsService,
              private afs:AngularFirestore,
              private authSvc:AuthService) {


    this.notiService.getPermission();



  }

  ngOnInit() {
    //Get Lawyer Profile
    this.authSvc.getUserProfile(this.authSvc.getUid())
    .valueChanges()
    .subscribe(
      (userProfile)=>{
        this.lawyer = userProfile;
      }
    )

    this.searchField = new FormControl();
    // this.results$ = this.searchField.valueChanges
    // .pipe(
    //   debounceTime(1000),
    //   filter(val => !!val),
    //   switchMap(offset => {
    //     console.log(offset)
    //     return this.afs.collection('requests',
    //     ref=> ref.where('userFirstAssigned.uid', '==', this.lawyer.id)).valueChanges()
    //   }
    // ))

    this.searchField.valueChanges
    .pipe(debounceTime(500)).subscribe(
      (value) => {
        this.afs.collection('requests',
      ref => ref.where('userFirstAssigned.uid', '==', this.lawyer.id)
      .where('searchableIndex','array-contains', value.toLowerCase()).orderBy('id','desc'))
      .valueChanges()
      .subscribe(
        (results)=> {
          this.results$ = results;
          console.log(results);
        }
      )
      }
    )

    // this.results = this.search();
  }


  // onkeyup(e){
  //   this.offset.next(e.target.value.toLowerCase());
  //   console.log('Results');
  //   console.log(this.results);
  // }

  // search() {
  //   return this.offset.pipe(
  //     filter(val => !!val),
  //     switchMap(offset => {
  //       return this.afs.collection('requests',
  //       ref =>
  //       // ref.where('userFirstAssigned.uid', '==', this.lawyer.id);
  //       // ref.orderBy(`searchableIndex.${offset}`);
  //       ref.where('userFirstAssigned.uid', '==', this.lawyer.id)
  //       .where('searchableIndex', 'array-contains', offset)
  //       .limit(5)
  //       )
  //       .valueChanges()
  //     })
  //   )
  // }






}
