import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCityComponent } from './search-city/search-city.component';
import { CitiesService } from './cities.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SearchCityComponent],
  providers:[CitiesService],
  exports:[SearchCityComponent]
})
export class SearchCityModule { }
