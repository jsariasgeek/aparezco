import {Message} from './message';
import {StatusQueue} from "./status-queue";
import {LawyerAttending} from './lawyer-attending';
import { Activity } from './activity';

export interface Solicitud {
    id: number;
    name: string;
    email: string;
    celular: number;
    caso: string;
    ciudad: string;    
    messages:Message[];
    endFirstChat?:boolean;
    ratingSent?:boolean;
    status:string;
    userFirstAssigned?:LawyerAttending;
    statusQueue:StatusQueue[];
    categoryByLawyer?:string;
    activities?:Activity[];
}
