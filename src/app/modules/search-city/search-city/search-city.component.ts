import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CitiesService } from '../cities.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { City } from '../city.model';


@Component({
  selector:'app-search-city',
  templateUrl:'./search-city.component.html',
  styleUrls:['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {

  ciudadesConCobertura = [];
  searchCiudad:FormControl;
  results$;
  @Output() ciudadSelected = new EventEmitter<string>();

  @ViewChild('ciudad') ciudad;

  constructor(private citiesSvc:CitiesService){}

  ngOnInit(){
    this.searchCiudad = new FormControl();
    this.searchCities();

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
  );
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
    this.ciudadSelected.emit(cityName);
    console.log('City ', this.searchCiudad.value);
  }


}


