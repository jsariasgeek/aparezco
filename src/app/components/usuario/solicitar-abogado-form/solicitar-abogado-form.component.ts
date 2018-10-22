import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm, FormControl} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../../services/messages.service';
import {Message} from '../../../models/message';
import {StatusQueue} from "../../../models/status-queue";
import swal from 'sweetalert2';
import {Solicitud} from '../../../models/solicitud';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';
import { debounceTime, map } from 'rxjs/operators';
import { City } from 'src/app/models/city';
import { CitiesService } from 'src/app/modules/search-city/cities.service';

@Component({
  selector: 'app-solicitar-abogado-form',
  templateUrl: './solicitar-abogado-form.component.html',
  styleUrls: ['./solicitar-abogado-form.component.css']
})
export class SolicitarAbogadoFormComponent implements OnInit {

 request:Solicitud;
 message:Message;
 requestEndFirstChat:boolean = false;
 prospectoRegistrado:boolean = false;



 ciudadesConCobertura = [];

 selectedCiudad = 'nociudad';
 //Buscar Ciudad
 searchCiudad:FormControl;
 results$;

  statusQueue:StatusQueue;
 @ViewChild('f') requestForm:NgForm;
 @ViewChild('ciudad') ciudadInput:HTMLInputElement
  constructor(private requestsService:RequestsService,
              private messagesService:MessagesService,
              private authService:AuthService,
              private router:Router,
              private citiesSvc:CitiesService){
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

    //Get cities with Cobertura

    //Init Form Control
    this.citiesSvc.getCiudadesConCobertura()
    .valueChanges()
    .subscribe(
      (cities)=>{
       cities.forEach(
         (city:City)=>{
           this.ciudadesConCobertura.push(city.nombre)
         }
       )
      }
    )

    this.searchCiudad = new FormControl();
    this.searchCities();

  }

  searchCities(){
    this.searchCiudad.valueChanges
    .pipe(debounceTime(500)).subscribe(
      (value) => {
       this.citiesSvc.searchCitie(value)
      .valueChanges()
      .subscribe(
        (results)=> {

          this.results$ = results;
        }
      )
      }
    )
  }

  setCitySearched(cityName){
    this.searchCiudad.setValue(cityName);
    console.log(this.searchCiudad.value);
  }

  sendRequest(f){
    this.message = {
      id:Date.now(),
      text:f.value.caso,
      user:f.value.email
    }
    this.statusQueue = {
      id:Date.now(),
      text:'waitingLawyer',
      user:f.value.email

    }

    this.request = {
      id:Date.now(),
      name:f.value.nombres,
      email:f.value.email,
      celular:f.value.celular,
      caso:f.value.caso,
      ciudad:this.searchCiudad.value,
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

saveUser(f:NgForm){
  const user = {
    nombres:f.value.nombres,
    email:f.value.email,
    celular:f.value.celular,
    caso:f.value.caso,
  }
  console.log(user);
  this.requestsService.saveProspecto(user).then(
    ()=>{this.prospectoRegistrado = true}
  )
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
