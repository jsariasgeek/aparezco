import {AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from '../../../services/messages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {Message} from '../../../models/message';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {UserProfile} from '../../../models/user-profile';
import {Rating} from '../../../models/rating';
import {RatingService} from '../../../services/rating.service';
import {Solicitud} from '../../../models/solicitud';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-abogado-chat',
  templateUrl: './abogado-chat.component.html',
  styleUrls: ['./abogado-chat.component.css']
})
export class AbogadoChatComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked {
  userLogged:boolean = false;
  message: Message;
  messages:Message[];
  request: Solicitud;
  requestDoc:AngularFirestoreDocument<Solicitud>;
  requestId: any = null;
  lawyerUid = '';
  lawyerName = '';
  commentLawyer: string;
  lawyer:UserProfile;
  showSurvey:boolean = false;
  ratingSent:boolean = false;

  lawyerRating = 0;


  @ViewChild('f') messageForm: NgForm;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private messagesService: MessagesService,
              private authService: AuthService,
              private requestsService: RequestsService,
              private route: ActivatedRoute,
              private router: Router,
              private elRef: ElementRef,
              private ratService:RatingService,
              private afs:AngularFirestore) {
    // this.messagesService.getMessages().valueChanges()
    //   .subscribe((messages)=>{
    //     this.messages = messages;
    //     this.messages = messages;
    //     console.log(this.messages);
    //     this.scrollToBottom();
    //   })

    this.requestId = this.route.snapshot.params['request'];

    if (!this.requestId) {
      this.requestId = localStorage.getItem('request');
      console.log('Local storage request: ' + this.requestId);
    }

    if (!this.requestId) {
      this.router.navigate(['solicitar-abogado']);
    }

    this.requestDoc = this.afs.doc<Solicitud>(`requests/${this.requestId}`)
    this.requestDoc.valueChanges()
      .subscribe(
        (request: Solicitud) => {
          this.request = request;
          this.ratingSent = request.ratingSent;
          this.showSurvey = request.endFirstChat && (!request.ratingSent);
          this.messages = request.messages;
          // console.log('Este es el Request');
          // console.log(this.request);
          if(request.userFirstAssigned){
            this.lawyerUid = request.userFirstAssigned.uid;
            this.lawyerName = request.userFirstAssigned.name;

            this.authService.getUserProfile(this.request.userFirstAssigned.uid).valueChanges()
              .subscribe(
                (user:UserProfile)=>{
                  // console.log('User Lawyer');
                  console.log('Lista de Users');
                  console.log(user);
                  this.lawyer = user;
                  console.log('Este es el lawyer');
                  console.log(this.lawyer);
                }
              )


          }








          // console.log('LawyerId');
          // console.log(this.lawyerUid)
          // console.log(this.request);
          /*console.log(this.request.messages);*/
          this.scrollToBottom();
        }
      );






    // this.requestsService.getUsers().valueChanges()
    //   .subscribe(
    //     (users)=>{
    //       console.log('Users');
    //       console.log(users);
    //     }
    //   )
  }

  ngOnInit() {
    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          this.userLogged = true;
        }
      }
    )

    // this.requestsService.getUsers().valueChanges()
    //   .subscribe(
    //     (users)=>{
    //       console.log('Users');
    //       console.log(users);
    //     }
    //   )


  }

  ngAfterViewInit() {
    if(this.showSurvey){
      this.elRef.nativeElement.querySelector('.rating').removeAttribute('tabindex');
    }
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
      user:this.request.email
    }

    this.request.messages.push(this.message);
    this.requestsService.sendRequest(this.request);
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.request.endFirstChat){

      if(this.userLogged){
        return true
      }else{
        console.log('Usuario' + this.userLogged);
        return confirm('Si Sales del Chat perderás el histórico de tu Caso');
      }
    }
    else{
      return true;
    }
  }

  ratingClick($event) {
    // console.log($event);
    this.lawyerRating = $event.rating;

    // console.log('Request');

  }

  inputComment() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
    // const rating = new Rating(Date.now(), 'chat', '', this.request.id)

  }

  sendRating(comment) {
    console.log('Este es el comment');
    console.log(this.commentLawyer);
    const myRating = new Rating(Date.now(), this.lawyerUid, this.lawyerRating, 'chat', this.commentLawyer, this.request.id);
    console.log(myRating);
    console.log('Este es el lawyer assigned');
    // console.log(this.lawyer);
    // // this.lawyer.ratings = [];
    // this.lawyer.ratings.push(myRating);
    // this.authService.saveUser(this.lawyer);
    this.ratService.sendRating(myRating);
    this.request.ratingSent = true;
    this.requestsService.sendRequest(this.request);
    // this.elRef.nativeElement.querySelector('#rating').elRef.style.display = 'none';



    // this.authService.getUserProfile(this.lawyerUid).valueChanges()
    //   .subscribe(
    //     (user:UserProfile)=>{
    //       console.log(user);
    //     }
    //   )


  }

}
