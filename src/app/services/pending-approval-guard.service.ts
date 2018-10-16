
import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {RequestsService} from './requests.service';
import {UserProfile} from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class  PendingApprovalGuardService implements CanActivate{

  loggedIn = false;
  isApproved = false;

  constructor(private authService:AuthService, private router:Router, private reqService:RequestsService) {
    this.authService.isLogged().subscribe((response)=>{
      if(response && response.uid){
        this.reqService.getUserAssigned(response.uid).valueChanges()
          .subscribe((user:UserProfile)=>{
            console.log(user);
            if (user.isLawyerApproved){
              this.isApproved = true;
              console.log('El usuario está aprobado');
            }else{
              console.log('El usuario no está aprobado');
              this.isApproved = false;
              this.router.navigate(['abogado-pending-approval']).then(()=>{
                console.log('Navegamos hasta pendiente de aprobación')
              }).catch(()=>{
                console.log('No pudimos navegar a pendiente de aprobación');
                this.isApproved = false;
              })
            }
          })
      }else{
        this.loggedIn = false;
        this.isApproved = false;
      }
    }, (error)=>{
      this.loggedIn = false;
      this.isApproved = false;
    })
  }

  canActivate(route){

    if(!this.loggedIn) {
      this.router.navigate(['/abogado-login']);
    }
    return this.isApproved;
  }
}

