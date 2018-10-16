import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserProfile} from '../../../models/user-profile';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  @ViewChild('status')
  lawyers:UserProfile[];

  constructor(private authService:AuthService) {
    this.authService.getLawyers().valueChanges()
      .subscribe(
        (lawyers:UserProfile[])=>{
          console.log('Lawyers');
          console.log(lawyers);
          this.lawyers = lawyers;
        }
      )
  }

  ngOnInit() {

  }

  changeStatus(lawyer, event){

    // console.log('Cambié el Input');
    // this.authService.getUserProfile(id).valueChanges()
    //   .subscribe(
    //     (lawyer)=>{
    //       this.lawyerSelected = lawyer;
    //       console.log(event.target.checked);
    //       this.lawyerSelected.isApproved = event.target.checked;
    //       console.log(this.lawyerSelected);
    //     }
    //   )

    console.log(lawyer);


    this.authService.saveUserProfile(lawyer).then(
      ()=>{
        console.log('Actualicé el user');
      }
    )
  }

}
