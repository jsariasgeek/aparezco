import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/general/home/home.component';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import { SolicitarAbogadoFormComponent } from './components/usuario/solicitar-abogado-form/solicitar-abogado-form.component';
import { AbogadoChatComponent } from './components/usuario/abogado-chat/abogado-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AbogadoHomeComponent} from './components/abogado/abogado-home/abogado-home.component';
import { AbogadoBackendChatComponent } from './components/abogado/abogado-backend-chat/abogado-backend-chat.component';
import { AbogadoLoginComponent } from './components/abogado/abogado-login/abogado-login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';
import {MessagesService} from './services/messages.service';
import {TimeAgoPipe} from "time-ago-pipe";
import { AbogadoProfileComponent } from './components/abogado/abogado-profile/abogado-profile.component';
import {registerLocaleData} from "@angular/common";
import localeCo from '@angular/common/locales/es'
import {DeactivateChatService} from './services/deactivate-chat.service';
import { PendingAprovvalComponent } from './components/abogado/pending-aprovval/pending-aprovval.component';
import {MyGuardService} from './services/my-guard.service';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { UsuarioRegistroComponent } from './components/usuario/usuario-registro/usuario-registro.component';
import { UsuarioHomeComponent } from './components/usuario/usuario-home/usuario-home.component';
import { UsuarioLoginComponent } from './components/usuario/usuario-login/usuario-login.component';
import { UsuarioResetPasswordComponent } from './components/usuario/usuario-reset-password/usuario-reset-password.component';
import {UserGuardService} from './services/user-guard.service';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil/usuario-perfil.component';
import { DetalleCasoComponent } from './components/usuario/detalle-caso/detalle-caso.component';
import {StarRatingModule} from 'angular-star-rating';
import { UsuarioRegistroDirectComponent } from './components/usuario/usuario-registro-direct/usuario-registro-direct.component';
import { AbogadoDetalleCasoComponent } from './components/abogado/abogado-detalle-caso/abogado-detalle-caso.component';
import { AbogadoActividadesComponent } from './components/abogado/abogado-detalle-caso/abogado-actividades/abogado-actividades.component';
import {LawerOrUserGuardService} from './services/lawer-or-user-guard.service';
import {LoginGuardService} from './services/login-guard.service';
import {PendingApprovalGuardService} from './services/pending-approval-guard.service';
import {TruncatePipe} from './pipes/truncate.pipe';
import {ResaltarStatusDirective} from "./directives/resaltar-status.directive";
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AbogadoListadoCasosComponent } from './components/abogado/abogado-home/abogado-listado-casos/abogado-listado-casos.component';
import { NgbDropdownModule, NgbModule, NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AbogadoRootComponent } from './components/abogado/abogado-root/abogado-root.component';
import { SearchCityModule } from './modules/search-city/search-city.module';
import { DetalleActividadComponent } from './components/abogado/abogado-detalle-caso/abogado-actividades/detalle-actividad/detalle-actividad.component';




registerLocaleData(localeCo, 'es')

const appRoutes:Routes = [
  // {path:'', component:HomeComponent},
  {path:'', component:SolicitarAbogadoFormComponent},
  {path:'abogado-login', component:AbogadoLoginComponent, canActivate:[LoginGuardService]},
  {path:'abogado-pending-approval', component:PendingAprovvalComponent},
  {path:'abogado', component:AbogadoHomeComponent, canActivate:[MyGuardService],
  children:[
    {path:'listarcasos/:status', component:AbogadoListadoCasosComponent, canActivate:[MyGuardService]},
    {path:'casos/:id', component:AbogadoDetalleCasoComponent, canActivate:[MyGuardService]},
    {path:'casos/:id/actividades', component:AbogadoActividadesComponent, canActivate:[MyGuardService]},
    {path:'casos/:id/actividades/:activityId', component:DetalleActividadComponent, canActivate:[MyGuardService]},
  ]
},
  {path:'abogado/casos/:id', component:AbogadoDetalleCasoComponent, canActivate:[MyGuardService]},
  {path:'abogado/casos/:id/actividades', component:AbogadoActividadesComponent, canActivate:[MyGuardService]},
  {path:'abogado/chat', component:AbogadoBackendChatComponent, canDeactivate:[DeactivateChatService]},
  {path:'abogado/perfil', component:AbogadoProfileComponent},
  {path:'abogado-pending-approval', component:PendingAprovvalComponent},
  {path:'abogado-chat', component:AbogadoChatComponent, canDeactivate:[DeactivateChatService]},
  {path:'admin', component:AdminHomeComponent, canActivate:[MyGuardService]},
  //Rutas del Usuario
  {path:'usuario/registro', component:UsuarioRegistroComponent},
  {path:'usuario/registro-direct', component:UsuarioRegistroDirectComponent},
  {path:'usuario/login', component:UsuarioLoginComponent},
  {path:'usuario/resetpassword', component:UsuarioResetPasswordComponent},
  {path:'usuario/home', component:UsuarioHomeComponent, canActivate:[UserGuardService]},
  {path:'usuario/casos/detalle/:id', component:DetalleCasoComponent},
  {path:'usuario/perfil', component:UsuarioPerfilComponent, canActivate:[UserGuardService]},
  //404
  {path:'**', component:PageNotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SolicitarAbogadoFormComponent,
    AbogadoChatComponent,
    AbogadoHomeComponent,
    AbogadoBackendChatComponent,
    AbogadoLoginComponent,
    TimeAgoPipe,
    AbogadoProfileComponent,
    PendingAprovvalComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    PageNotFoundComponent,
    UsuarioRegistroComponent,
    UsuarioHomeComponent,
    UsuarioLoginComponent,
    UsuarioResetPasswordComponent,
    NavbarComponent,
    UsuarioPerfilComponent,
    DetalleCasoComponent,
    UsuarioRegistroDirectComponent,
    AbogadoDetalleCasoComponent,
    AbogadoActividadesComponent,
    TruncatePipe,
    ResaltarStatusDirective,
    AbogadoListadoCasosComponent,
    AbogadoRootComponent,
    DetalleActividadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StarRatingModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbAccordionModule.forRoot(),
    NgbCollapseModule.forRoot(),
    SearchCityModule,

      ],
  providers: [
    AuthService,
    MyGuardService,
    LawerOrUserGuardService,
    LoginGuardService,
    MessagesService,
    PendingApprovalGuardService,
    {provide:LOCALE_ID, useValue:'es-CO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
