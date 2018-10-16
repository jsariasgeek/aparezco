import {Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from "../../../services/requests.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessagesService} from "../../../services/messages.service";
import {NgForm} from "@angular/forms";
import {Message} from "../../../models/message";
import {AuthService} from '../../../services/auth.service';
import {Solicitud} from '../../../models/solicitud';
import {Observable} from 'rxjs';
import swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-abogado-backend-chat',
  templateUrl: './abogado-backend-chat.component.html',
  styleUrls: ['./abogado-backend-chat.component.css']
})
export class AbogadoBackendChatComponent implements OnInit, OnChanges, OnDestroy {

  message: Message;
  request: Solicitud;
  requestId: any = null;
  requestDoc:AngularFirestoreDocument<Solicitud>;
  lawyerAssigned = null;
  messages:Message[];

  @ViewChild('f') messageForm: NgForm;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private messagesService: MessagesService,
              private requestsService: RequestsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router, private afs:AngularFirestore) {
    // this.messagesService.getMessages().valueChanges()
    //   .subscribe((messages)=>{
    //     this.messages = messages;
    //     console.log(this.messages);
    //     this.scrollToBottom();
    //   })


    this.requestId = this.route.snapshot.params['request'];
    this.lawyerAssigned = this.authService.getName();
    console.log('lawer');
    console.log(this.lawyerAssigned);

    if (!this.requestId) {
      this.requestId = localStorage.getItem('request');
      console.log('Local storage request: ' + this.requestId);
    }

    if (!this.requestId) {
      this.router.navigate(['solicitar-abogado']);
    }


    // this.requestsService.getRequest(this.requestId).valueChanges()
    //   .subscribe(
    //     (request: Solicitud) => {
    //       this.request = request;
    //       // this.messages = request.messages;
    //       this.

    //       // console.log(this.request);
    //       /*console.log(this.request.messages);*/
    //       this.scrollToBottom();
    //     }
    //   )

    this.requestDoc = this.afs.doc<Solicitud>(`requests/${this.requestId}`);
    this.requestDoc.valueChanges().subscribe(
      (request:Solicitud)=>{
        this.request = request;
        this.messages = request.messages;
      }
    )



  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngDoCheck() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom() {
    scrollTo(0, document.body.scrollHeight);
  }


  sendMessage(f) {
    console.log('Se envió el formulario');
    console.log(f.value.text);
    this.message = {
      id:Date.now(),
      text:f.value.text,
      user:this.request.userFirstAssigned.email,
    }
    this.requestsService.saveMessagesIntoRequest(this.request.id, this.message);

    // this.request.messages.push(this.message);
    // this.requestsService.sendRequest(this.request);
    f.reset();
    // console.log(this.message);

    /*this.message.id = Date.now();
    console.log('Consegui el request: ');
      console.log(this.request);
    this.message.request = this.request.id;
    this.message.user = this.request.email;
    this.message.text = this.message.text;
    console.log(this.message);
    this.messagesService.sendMessage(this.message);
    this.message = {};*/
  }

  endChat() {
    this.request.endFirstChat = true;
    this.request.ratingSent = false;
    this.requestsService.sendRequest(this.request);
    this.router.navigate(['/abogado/listarcasos/waitingLawyer'])
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   canDeactivate(){
    //   if(!this.request.endFirstChat){
    //
    //     if(this.userLogged){
    //       return true
    //     }else{
    //       console.log('Usuario' + this.userLogged);
    //       return confirm('Si Sales del Chat no volverás');
    //     }
    //   }
    //   else{
    //     return true;
    //   }
    // }

    return confirm('Estás Seguro que deseas salir del chat?');



    // return swal({
    //   title: '',
    //   type: 'question',
    //   html:
    //     'Deseas Finalizar el Caso?',
    //   showCloseButton: false,
    //   showCancelButton: true,
    //   focusConfirm: true,
    //   confirmButtonText:
    //     'Deseo continuar con el caso en curso',
    //   confirmButtonAriaLabel: 'Thumbs up, great!',
    //   cancelButtonText:
    //       'Deseo Finalizar',
    //   cancelButtonAriaLabel: 'Thumbs down',
    //   allowOutsideClick:false
    // }).then((result)=>{
    //   if(result.value){
    //     this.endChat();
    //     return true;
    //   }else{
    //     return false;
    //   }
    // })


  }

  ngOnDestroy(){
    this.endChat();
  }


}
