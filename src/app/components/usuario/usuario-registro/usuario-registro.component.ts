import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';
import {Solicitud} from '../../../models/solicitud';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {

  requestId = null;
  request: any = {};
  userRegistered = false;
  emailUser = '';

  constructor(private route: ActivatedRoute, private reqService: RequestsService,
              private authService: AuthService, private router: Router) {

    this.authService.isLogged().subscribe(
      (response) => {
        if (response && response.uid) {
          this.authService.getUserProfile(response.uid).valueChanges()
            .subscribe(
              (userProfile: UserProfile) => {

                if(userProfile){
                  if(userProfile.isLawyer){
                    this.router.navigate(['abogado']);
                  }else{
                    this.router.navigate(['usuario/home']);
                  }
                }
              }
            );
        }
      }
    );

    this.route.queryParams.subscribe(
      (params) => {
        console.log(params['id']);
        this.requestId = params['id'];
        this.reqService.getRequest(this.requestId).valueChanges()
          .subscribe(
            (request:Solicitud) => {
              if (request) {
                this.request = request;
                this.emailUser = request.email;
              }
            }
          );
      }
    );
  }

  ngOnInit() {

  }

  register(f) {
    const password = f.controls.pass.value;
    this.authService.saveUserWithEmailAndPassword(this.request.email, password).then(
      (response) => {
        console.log('El usuario se creó exitosamente from usuario-registro-component');
        console.log(response);
        // console.log('Este es el user in response');
        // console.log(response.user.uid);

        const userProfile: UserProfile = {
          id: response.user.uid,
          timestamp: Date.now(),
          name: this.request.name,
          email: this.request.email,
          celular: +this.request.celular,
          photoUrl: '',
          isLawyer: false,
          isLawyerApproved: false,
          isStaff: false,
        };

        this.authService.saveUserProfile(userProfile).then(
          () => {
            console.log('Cree el userProfile exitosamente');
          }
        );


        // this.userProfile = new UserProfile(+response.user.uid, +Date.now(),
        //   this.request.name, this.request.email, false, false, false)
      }
    ).then(
      () => {
        // this.authService.createUserProfile(this.userProfile).then(
        //   ()=>{
        //     console.log('Creé el perfil de usuario exitosamente');
        //   }
        // )
      }
    ).then(
      () => {
        this.router.navigate(['/usuario/home']);
      }
    )

    //   .then(
    //   ()=>{
    //     this.authService.loginWithEmailAndPassword(this.request.email, password).then(
    //       ()=>{
    //         const userProfile = new UserProfile(this.authService.getUser().uid, new Date.now(),
    //           this.request.name, this.request.email, false, false, false,
    //         )
    //         this.authService.createUserProfile(userProfile).then(
    //           console.log('Se creó el perfil de usuario exitosamente');
    //         this.router.navigate(['/usuario/home']);
    //       )
    //
    //       }
    //     )
    //   }
    // )

      .catch(
      (err) => {
        console.log('Se ha presentado un error');
        console.log(err);
        if (err.code == 'auth/email-already-in-use') {
          this.userRegistered = true;
        }
      }
    );
  }

  userFacebookLogin() {
    this.authService.userFacebookLogin().then(
      (response) => {
        console.log(response);

        const name = response.user.displayName;
        const email = response.user.email;
        const celular = null;

        const userProfile: UserProfile = {
          id: response.user.uid,
          timestamp: Date.now(),
          name: name,
          email: this.emailUser ? this.emailUser:response.user.email,
          celular: celular,
          photoUrl: '',
          isLawyer: false,
          isLawyerApproved: false,
          isStaff: false,
        };

        this.authService.saveUserProfile(userProfile).then(
          () => {
            console.log('Cree el userProfile exitosamente');
          }
        );

      }
    ).catch(
      (error) => {
        console.log('Error');
        console.log(error);
        if (error.code == 'auth/account-exists-with-different-credential') {
          this.userRegistered = true;
        }
      }
    );
  }

  userGmailLogin() {}




}
