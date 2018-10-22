import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

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
