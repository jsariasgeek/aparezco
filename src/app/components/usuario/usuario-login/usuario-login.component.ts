import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserProfile} from '../../../models/user-profile';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  returnUrl:string;

  invalidCredentials:boolean = false;
  userNotFound = false;
  isCollapsed = false;

  constructor(private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute) {}

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    this.authService.isLoggedIn().pipe(
      tap(user => {
        if(user){
          this.authService.getUserProfile(user.uid).valueChanges()
          .subscribe(
          (userProfile)=>{
              if(userProfile.isLawyer){
                this.router.navigate(['/abogado/login']);
              }else{
                this.router.navigate(['/usuario/home']);
              }
          }
          )
        }
      })
    )
  }

  login(f:NgForm){
    const email = f.controls.email.value;
    const password = f.controls.password.value;
    this.authService.loginWithEmailAndPassword(email, password).then(
      ()=>{
        this.router.navigate(['/usuario/home']);
      }
    ).catch(
      (err)=>{
        console.log(err);
        if(err.code=='auth/wrong-password'){
          console.log('Invalid User or Password');
          this.invalidCredentials = true;

        }
        if(err.code=="auth/user-not-found"){
          this.userNotFound = true;

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
