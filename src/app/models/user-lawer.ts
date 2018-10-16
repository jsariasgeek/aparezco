export class UserLawer {

    public name:string;
    public lastName:string;
    public email:string;
    public celular:number;
    public cedulaUrl:string;
    public diplomaUrl:string;
    public tarjetaUrl:string;
    public resumeUrl:string;


  constructor(name:string, lastName:string, email:string, celular:number, cedulaUrl:string,
              diplomaUrl:string, tarjetaUrl:string, resumeUrl:string){

    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.cedulaUrl = cedulaUrl;
    this.diplomaUrl = diplomaUrl;
    this.tarjetaUrl = tarjetaUrl;
    this.resumeUrl = resumeUrl;

  }

}
