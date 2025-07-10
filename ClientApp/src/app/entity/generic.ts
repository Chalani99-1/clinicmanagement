import {Brand} from "./brand";

export class Generic {

  public id !: number;
  public name !: string;
  public brands !:Array<Brand> ;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

}


