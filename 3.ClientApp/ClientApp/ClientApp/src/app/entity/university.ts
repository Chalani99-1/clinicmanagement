import {Country} from "./country";
import {Degree} from "./degree";

export class University {
  constructor(id: number, name: string, country: Country, degrees: Degree) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.degrees = degrees;
  }

  public id !: number;
  public name !: string;
  public country!: Country;
  public degrees!: Degree


}


