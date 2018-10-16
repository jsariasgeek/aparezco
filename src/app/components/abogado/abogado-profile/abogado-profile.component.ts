import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-abogado-profile',
  templateUrl: './abogado-profile.component.html',
  styleUrls: ['./abogado-profile.component.css']
})
export class AbogadoProfileComponent implements OnInit {

  name = null;
  email = null;
  thumbnail = null;

  constructor(private authService:AuthService) {
    this.authService.isLogged().subscribe(
      (response)=>{
        if(response && response.uid){
          this.name = this.authService.getName();
          this.email = this.authService.getEmail();
          this.thumbnail = this.authService.getImgUrl();
        }
      }
    )
  }

  ngOnInit() {
  }

}
