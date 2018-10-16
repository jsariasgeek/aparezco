import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  name = null;
  email = null;
  thumbnail = null;

  constructor(private authService:AuthService) {
    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          this.authService.getUserProfile(response.uid).valueChanges()
            .subscribe(
              (userProfile:UserProfile)=>{
                this.name = userProfile.name;
                this.email = userProfile.email;
                this.thumbnail = userProfile.photoUrl;
              }
            )
        }
      }
    )
  }

  ngOnInit() {
  }

}
