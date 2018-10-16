import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {RequestsService} from '../../../services/requests.service';
import {NgForm} from '@angular/forms';
import {UserProfile} from '../../../models/user-profile';
import {Message} from '../../../models/message';
import {StatusQueue} from '../../../models/status-queue';
import {Router} from '@angular/router';
import {Solicitud} from '../../../models/solicitud';

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {

  misCasos:Solicitud[];
  user:UserProfile;
  newRequest:Solicitud;

  constructor(private authService:AuthService, private reqService:RequestsService,
              private router:Router) {}

  ngOnInit() {
    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          console.log('Tengo al Usuario');
          console.log(response);
          this.reqService.getRequestsByEmail(response.email).valueChanges()
            .subscribe(
              (casos:Solicitud[])=>{
                this.misCasos = casos;
              }
            )

          this.authService.getUserProfile(response.uid).valueChanges()
            .subscribe(
              (userProfile:UserProfile)=>{
                this.user = userProfile;
                console.log('Tengo el User Profile');
                console.log(this.user);
              }
            )
        }
      }
    )

    if(!this.misCasos){
      console.log('No hay Casos');
    }

  }

  sendRequest(f:NgForm){

    const caso = f.controls.caso.value;

    const message:Message = {
      id:Date.now(),
      text:caso,
      user:this.user.email
    }

    const statusQueue = {
      id:Date.now(),
      text:'waitingLawyer',
      user:this.user.email
    }



    // const newRequest = new Solicitud(
    //   Date.now(),this.user.name, this.user.email, this.user.celular, caso, [message],
    //   false, false,'open', '', [statusQueue],
    //   '')

    const newRequest:Solicitud  = {
      id:Date.now(),
      name:this.user.name,
      email:this.user.email,
      celular:this.user.celular,
      caso:caso,
      messages:[message],
      status:'waitingLawyer',
      statusQueue:[statusQueue]

    }

    console.log(newRequest);

    this.reqService.sendRequest(newRequest);
    this.router.navigate(['/abogado-chat', {request:newRequest.id}],)

  }

}
