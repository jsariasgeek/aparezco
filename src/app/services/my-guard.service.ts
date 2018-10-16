
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {UserProfile} from '../models/user-profile';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGuardService implements CanActivate{

  loggedIn:boolean;
  isApproved:boolean;

  constructor(private authService:AuthService, private router:Router) {
    this.authService.isLogged().subscribe((response)=>{
      if(response && response.uid){
        this.loggedIn = true;
        this.authService.getUserProfile(response.uid).valueChanges()
          .subscribe(
            (userProfile:UserProfile)=>{
              if(userProfile){
                if(userProfile.isLawyer && userProfile.isLawyerApproved){
                  this.isApproved = true;
                  // TODO: Decouple in the future from the multiple implementations of MyGuardService
                 /*this.router.navigate(['/abogado']);*/
                }else{
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

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{

    if(!this.loggedIn){
      this.router.navigate(['/abogado-login'], {queryParams:{returnUrl:state.url}});
    }
    return (this.loggedIn && this.isApproved)
  }

}
