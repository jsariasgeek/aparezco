import { Injectable, Inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbogadoChatComponent} from '../components/usuario/abogado-chat/abogado-chat.component';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn:'root'
})
export class CitiesService {

  constructor(private afs:AngularFirestore){}

  searchCitie(value){
    const query = value.toLowerCase()
    return this.afs.collection('cities',
    ref => ref.where('searchableIndex', 'array-contains', query)  )
  }

  getCiudadesConCobertura(){
    return this.afs.collection('cities',
    ref => ref.where('cobertura', '==', true))
  }


}
