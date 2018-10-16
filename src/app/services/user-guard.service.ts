import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {UserProfile} from "../models/user-profile";

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  loggedIn = false;

  constructor(private authService:AuthService, private router:Router) {
    this.authService.isLogged().subscribe((response)=>{
      if(response && response.uid){
        this.authService.getUserProfile(response.uid).valueChanges()
          .subscribe(
            (userProfile:UserProfile)=>{
              if(userProfile){
                if(userProfile.isLawyer){
                  this.loggedIn = false;
                }
                else {
                  this.loggedIn = true;
                }
              }
            }
          )
      }else{
        this.loggedIn = false
      }
    }, (error)=>{
      this.loggedIn = false;
    })
  }

  canActivate(route){
    if(!this.loggedIn){
      this.router.navigate(['/usuario/login']);
    }
    return this.loggedIn;
  }

}
