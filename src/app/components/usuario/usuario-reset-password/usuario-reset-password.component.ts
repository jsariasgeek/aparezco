import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-usuario-reset-password',
  templateUrl: './usuario-reset-password.component.html',
  styleUrls: ['./usuario-reset-password.component.css']
})
export class UsuarioResetPasswordComponent implements OnInit {


  userAlreadyRegistered:boolean = false;
  emailSent:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  resetPass(f:NgForm){
    console.log('Recibimos el Correo: ');
    const email = f.controls.email.value;

    this.authService.sendPasswordResetEmail(email).then(
      ()=>{
        this.emailSent = true;
      }
    ).catch(
      (err)=>{
        if(err.code === "auth/user-not-found"){
          this.userAlreadyRegistered = true;
        }
        console.log(err);
      }
    )


  }

}
