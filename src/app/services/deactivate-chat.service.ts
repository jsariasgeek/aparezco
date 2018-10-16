import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbogadoChatComponent} from '../components/usuario/abogado-chat/abogado-chat.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateChatService implements CanDeactivate<AbogadoChatComponent>{

  canDeactivate(component:AbogadoChatComponent,
                currentRoute:ActivatedRouteSnapshot,
                currentState:RouterStateSnapshot,
                nextState?:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
    return component.canDeactivate();
  }

  constructor() { }
}
