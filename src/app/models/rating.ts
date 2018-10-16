export class Rating {

  public id:number;
  public abogadoId:string;
  public rating:number;
  public service:string;
  public comment:string=null;
  public requestId:number;

  constructor(id:number, abogadoId:string, rating:number, service:string, comment:string=null, requestId:number){

    this.id = id;
    this.abogadoId = abogadoId;
    this.rating = rating;
    this.service = service;
    this.comment = comment;
    this.requestId = requestId;

  }

}
