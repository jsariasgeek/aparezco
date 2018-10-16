import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  name = null;
  thumbnail = null;
  isStaff = false;
  isLawyer = false

  constructor(private authService:AuthService){
    this.authService.isLogged().subscribe((result)=>{
      if(result && result.uid){
        this.loggedIn = true;
        setTimeout(()=>{
          // console.log('User Logged');
          this.authService.getUserProfile(result.uid).valueChanges()
            .subscribe((userProfile:UserProfile)=>{
              if(userProfile){
              // console.log('User Profile');
              // console.log(userProfile);
              this.name = userProfile.name;
              this.isStaff = userProfile.isStaff;
              this.isLawyer = userProfile.isLawyer;
              }
            })

        }, 500)
      }else{
        this.loggedIn = false;
        this.isStaff = false;
      }
    }, (err)=>{
      this.loggedIn = false;
      this.isStaff = false;
    })
  }

  logout(isLawyer){
    this.authService.logout(isLawyer);
  }

  ngOnInit(){}

}
