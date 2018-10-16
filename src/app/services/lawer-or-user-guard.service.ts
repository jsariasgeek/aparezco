import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserProfile} from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class LawerOrUserGuardService implements CanActivate{

  constructor(private authService:AuthService, private router:Router) {
    this.authService.isLogged().subscribe((response)=>{
      if(response && response.uid){
        this.authService.getUserProfile(response.uid).valueChanges()
          .subscribe(
            (userProfile:UserProfile)=>{
              if(userProfile.isLawyer){
                this.router.navigate(['/abogado']);
              }else{
                this.router.navigate(['/usuario/home']);
              }
            }
          )
      }
    })
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
    return true
  }

}
