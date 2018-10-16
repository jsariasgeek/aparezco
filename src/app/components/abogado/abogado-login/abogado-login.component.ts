import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UserProfile } from '../../../models/user-profile';

@Component({
  selector: 'app-abogado-login',
  templateUrl: './abogado-login.component.html',
  styleUrls: ['./abogado-login.component.css']
})
export class AbogadoLoginComponent implements OnInit {

  returnUrl:string;

  constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute){

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          this.authService.getUserProfile(response.uid).valueChanges()
          .subscribe(
            (user:UserProfile)=>{
              if(user.isLawyer && user.isLawyerApproved){
                // console.log('El abogado está aprobado');
                this.router.navigateByUrl(this.returnUrl);
              }
            }
          )
        }
      }
    )
  }

  ngOnInit() {}


  login(f){
    if (f=='facebook'){
      this.authService.abogadoFacebookLogin(this.returnUrl)
    }else{
      this.authService.abogadoGmailLogin(this.returnUrl)
    }
  }
}
