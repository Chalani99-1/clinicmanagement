import {Generic} from "./generic";

export class Brand{

  public id !: number;
  public name !: string;
  public generic!:Generic

  constructor(id:number,name:string , generic:Generic) {
    this.id=id;
    this.name=name;
    this.generic=generic
  }

}


