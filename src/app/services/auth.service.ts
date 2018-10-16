import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserProfile} from '../models/user-profile';

// rxjs imports
import {switchMap} from 'rxjs/operators';
import {of, Observable} from 'rxjs';

//AngularFire2 imports
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 public user;

 user$:Observable<any>;

  constructor(private afAuth:AngularFireAuth,
              private router:Router,
              private afs:AngularFirestore) {

    // this.user = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afDB
    //         .object<UserProfile>(`users/${user.uid}`)
    //         .valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
  }


  public abogadoFacebookLogin(returnUrl){

    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(
      (response)=>{
        console.log('response');
        console.log(response);
        const userProfileRef = this.afs.collection('users').doc(response.user.uid.toString()).ref
        userProfileRef.get().then(
          (doc)=>{
            if(!doc.exists){
              const userProfile:UserProfile = {
                id:response.user.uid,
                timestamp:Date.now(),
                name:response.user.displayName,
                email:response.user.email,
                celular:null,
                photoUrl:response.user.photoURL,
                isLawyer:true,
                isLawyerApproved:false,
                isStaff:false,
              }
              this.saveUserProfile(userProfile)
            }

          }
        ).catch(
          (error)=>{
            console.log('Error al consultar el userProfile');
            console.log(error);
          }
        )
      }
    ).then(
      ()=>{
        this.router.navigateByUrl(returnUrl);
      }
    )
  }


  public abogadoGmailLogin(returnUrl){

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (response)=>{
        console.log('response');
        console.log(response);
        const userProfileRef = this.afs.collection('users').doc(response.user.uid.toString()).ref
        userProfileRef.get().then(
          (doc)=>{
            if(!doc.exists){
              const userProfile:UserProfile = {
                id:response.user.uid,
                timestamp:Date.now(),
                name:response.user.displayName,
                email:response.user.email,
                celular:null,
                photoUrl:response.user.photoURL,
                isLawyer:true,
                isLawyerApproved:false,
                isStaff:false,
              }
              this.saveUserProfile(userProfile)
            }

          }
        ).catch(
          (error)=>{
            console.log('Error al consultar el userProfile');
            console.log(error);
          }
        )
      }
    ).then(
      ()=>{
        this.router.navigateByUrl(returnUrl);
      }
    )
  }

  public isLogged(){
    return this.afAuth.authState;
  }

  // public getUser(){
  //   return this.afAuth.auth.currentUser;
  // }

  public getName(){
    return this.afAuth.auth.currentUser.displayName;
  }

  public getEmail(){
    return this.afAuth.auth.currentUser.email;
  }

  public getImgUrl(){
    return this.afAuth.auth.currentUser.photoURL;
  }

  public getUid(){
    return this.afAuth.auth.currentUser.uid;
  }

  public logout(isLawyer){
    this.afAuth.auth.signOut().then(()=>{
      if(isLawyer){
      this.router.navigate(['abogado-login']);
      }else{
        this.router.navigate(['usuario/login']);
      }
    })
  }

  // public verifyIsApproved(id){
  //   return this.afDB.object('/users/'+ id)
  // }

  public getUserProfile(id){
    return this.afs.doc<UserProfile>(`users/${id.toString()}`)
  }

  // public getUserProfileByEmail(email){
  //   return this.afAuth.auth.
  //   // return this.afDB.object('/users/')
  //
  // }

  public sendPasswordResetEmail(email){
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  // getAssignedRequestsToTheUser(uid){
  //   console.log('UID');
  //   console.log(uid);
  //   return this.afDB.list('/requests', ref =>
  //     ref.orderByChild('userFirstAssigned').equalTo(uid)
  //   )
  // }

  // getAllUsers(){
  //   return this.afs.collection('users')
  // }

  getLawyers(){
    return this.afs.collection('users', ref => ref.where(
      'isLawyer', '==', true)
    );
    // return this.afDB.list('/users/', ref =>
    // ref.orderByChild('isLawyer').equalTo(true))
  }

  // public saveUser(user){
  //   return this.afDB.database.ref('/users/'+user.id).set(user)
  // }

  public saveUserProfile(userProfile){
    return this.afs.collection<UserProfile>('users').doc(userProfile.id.toString()).set(userProfile)
  }

  public saveUserWithEmailAndPassword(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  public loginWithEmailAndPassword(email,password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  // public createUserProfile(userProfile:UserProfile){
  //   return this.afDB.database.ref('/users/'+userProfile.id).set(userProfile);
  // }

  public userFacebookLogin(){
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  }


}
