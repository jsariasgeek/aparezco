// Angular imports
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

// Internal imports
import { AuthService } from "./auth.service";
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import { UserProfile } from '../models/user-profile';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  returnUrl:string;
  userLogged:Observable<UserProfile>;

  constructor(private authService: AuthService, private router: Router) {

    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          this.authService.getUserProfile(response.uid).valueChanges()
          .subscribe(
            (user:UserProfile)=>{
              if(user.isLawyer && user.isLawyerApproved){
                this.router.navigate(['/abogado']);
              }else{
                this.router.navigate(['/usuario/home']);
              }
            }
          )
        }
      }
    )

    // if(this.authService.isLogged()){
    //   console.log(this.authService.getUid())
    //  this.authService.getUserProfile(this.authService.getUid()).valueChanges()
    //  .subscribe(
    //    (user:UserProfile)=>{
    //      console.log(user)
    //      if(user.isLawyer && user.isLawyerApproved){
    //        this.router.navigate(['/abogado']);
    //      }
    //    }
    //  )

    // }
  }

  //   this.authService.user.pipe(
  //     take(1),
  //     map(user => !!user),
  //     tap(loggedIn => {
  //       if (loggedIn) {
  //         console.log("User already authenticated");
  //         this.router.navigate(["/abogado"]);
  //       }
  //     })
  //   );

  // }

  /** Primary guard method. Initializes the ActivatedRouteSnapShot and RouterStateSnapshot.
   *  The ActivatedRouteSnapshot contaisn the future route that will be activate, should you
   *  pass the guard. The RouterStateSnapshot contains the future routerState of the application.
   *  All depends if you pass the guard.
   */
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //
  //
  // }

  canActivate(){
    return true;
  }


}
