
export class UserProfile {

  public id:string;
  public timestamp:number;
  public name:string;
  public email:string;
  public celular:number;
  public photoUrl:string;
  public isLawyer:boolean;
  public isLawyerApproved:boolean;
  public isStaff:boolean;

  constructor(id:string, timestamp:number, name:string, email:string, celular:number, photoUrl:string,
              isLawyer:boolean, isLawyerApproved:boolean, isStaff:boolean){
    this.id = id;
    this.timestamp = timestamp;
    this.name = name;
    this.email = email;
    this.celular = celular;
    this.photoUrl =  photoUrl;
    this.isLawyer = isLawyer;
    this.isLawyerApproved = isLawyerApproved;
    this.isStaff = isStaff;

  }

}
