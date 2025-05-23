
export class District {

  public id !: number;
  public name !: string;
  public district!: District;


  constructor(id: number, name: string, district: District) {
    this.id = id;
    this.name = name;
    this.district = district;
  }
}


