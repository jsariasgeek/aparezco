import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserProfile} from '../../../models/user-profile';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  invalidCredentials:boolean = false;

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          // console.log('El usuario ya se ha logueado previamente');
          // this.router.navigate(['usuario/home']);
          this.authService.getUserProfile(response.uid).valueChanges()
            .subscribe(
              (userProfile:UserProfile)=>{
                if(userProfile){
                  if(userProfile.isLawyer){
                    this.router.navigate(['/abogado-login']);
                  }else{
                    this.router.navigate(['/usuario/home']);
                  }
                }
              }
            )
        }
      }
    )
  }

  login(f:NgForm){
    const email = f.controls.email.value;
    const password = f.controls.password.value;
    this.authService.loginWithEmailAndPassword(email, password).then(
      ()=>{
        console.log('Nos logueamos correctamente');
        this.router.navigate(['/usuario/home']);
      }
    ).catch(
      (err)=>{
        console.log(err);
        if(err.code=='auth/wrong-password' || err.code=="auth/user-not-found"){
          console.log('Invalid User or Password');
          this.invalidCredentials = true;

        }
      }
    )
  }

  userFacebookLogin(){
    this.authService.userFacebookLogin().then(
      (response)=>{
        this.authService.getUserProfile(response.user.uid).valueChanges()
          .subscribe(
            (userProfile:UserProfile)=>{
              if(!userProfile){
                const user: UserProfile = {
                  id: response.user.uid,
                  timestamp: Date.now(),
                  name: response.user.displayName,
                  email: response.user.email,
                  celular:null,
                  photoUrl:response.user.photoURL,
                  isLawyer: false,
                  isLawyerApproved: false,
                  isStaff: false,
                };
                this.authService.saveUserProfile(user).then(
                  ()=>{
                    console.log('Cree el user Profile exitosamente');
                  }
                ).catch(
                  ()=>{
                    console.log('Ha Ocurrido un error');
                  }
                )
              }
            }
          )
        this.router.navigate(['usuario/home']);
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    )
  }

}
