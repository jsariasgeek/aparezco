import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          console.log('El usuario está logueado');
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
      }
    )
  }

}
