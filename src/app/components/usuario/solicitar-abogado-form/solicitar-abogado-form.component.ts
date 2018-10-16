import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../../services/messages.service';
import {Message} from '../../../models/message';
import {StatusQueue} from "../../../models/status-queue";
import swal from 'sweetalert2';
import {Solicitud} from '../../../models/solicitud';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';

@Component({
  selector: 'app-solicitar-abogado-form',
  templateUrl: './solicitar-abogado-form.component.html',
  styleUrls: ['./solicitar-abogado-form.component.css']
})
export class SolicitarAbogadoFormComponent implements OnInit {

 request:Solicitud;
 message:Message;
 requestEndFirstChat:boolean = false;

  statusQueue:StatusQueue;
 @ViewChild('f') requestForm:NgForm;
  constructor(private requestsService:RequestsService,
              private messagesService:MessagesService,
              private authService:AuthService,
              private router:Router){
    // this.requestForm = new FormGroup({
    //   'name':new FormControl(this.request.name,[
    //     Validators.required,
    //     Validators.minLength(4)
    //   ]),
    //   'email':new FormControl(this.request.email, [
    //     Validators.required,
    //     Validators.email
    //   ]),
    //   'celular': new FormControl(this.request.celular, [
    //     Validators.required
    //   ]),
    //   'caso': new FormControl(this.request.caso, [
    //     Validators.required
    //   ])
    // })

    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          this.authService.getUserProfile(response.uid).valueChanges()
            .subscribe(
              (user:UserProfile)=>{
                if(user.isLawyer){
                  this.router.navigate(['/abogado/listarcasos/waitingLawyer']);
                }else{
                  this.router.navigate(['usuario/home']);
                }
              }
            )
        }
      }
    )

    const localRequestId  = localStorage.getItem('request');

    if (localStorage.getItem('request')){
      this.requestsService.getRequest(localRequestId).valueChanges()
        .subscribe(
          (request:Solicitud)=>{
            if(request && request.endFirstChat){
              this.requestEndFirstChat = true;
            }
          }
        )
    }

    if ((localStorage.getItem('request') && (Date.now() - +localStorage.getItem('timestamp'))<=60000) && !this.requestEndFirstChat ){
      /*this.router.navigate(['abogado-chat']);*/
      swal({
        title: '',
        type: 'question',
        html:
        'Ya tienes un Caso en Curso, que deseas hacer? ',
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText:
          'Deseo continuar con el caso en curso',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          'Deseo Crear un Nuevo Caso',
        cancelButtonAriaLabel: 'Thumbs down',
        allowOutsideClick:false
      }).then((result)=>{
        if(result.value){
          this.router.navigate(['abogado-chat']);
        }
      })
    }

  }

  ngOnInit(){
  }

  sendRequest(f){
    console.log(f.value);

    this.message = {
      id:Date.now(),
      text:f.value.caso,
      user:f.value.email
    }
0

    console.log(this.message);

    this.statusQueue = {
      id:Date.now(),
      text:'waitingLawyer',
      user:f.value.email

    }

    this.request = {
      id:Date.now(),
      name:f.value.name,
      email:f.value.email,
      celular:f.value.celular,
      caso:f.value.caso,
      messages:[this.message,],
      endFirstChat:false,
      ratingSent:false,
      status:'waitingLawyer',
      // userFirstAssigned:'',
      statusQueue:[this.statusQueue,]
    }
    console.log(this.request);
    this.requestsService.sendRequest(this.request);
    // this.requestsService.saveMessagesIntoRequest(this.request.id, this.message)
    console.log(this.request.id);
    localStorage.setItem('request', String(this.request.id));
    localStorage.setItem('timestamp', String(Date.now()));
    this.router.navigate(['abogado-chat', {request:this.request.id}])

}

checkboxActive(event){
  console.log(event);
}





/*this.request = new Request()*/

   /* this.request.id = Date.now();
    this.message.id = Date.now();
    this.message.request = this.request.id;
    this.message.user = this.request.email;
    this.message.text = this.request.caso;
    this.request.messages.push(this.message);
    console.log(this.request);
    this.requestsService.sendRequest(this.request);*/

    // send message


    // console.log(this.message);
    // this.messagesService.sendMessage(this.message);
    // localStorage.setItem('request', this.request.id);
    //
    // this.router.navigate(['abogado-chat',{request:this.request.id}]);

  }
