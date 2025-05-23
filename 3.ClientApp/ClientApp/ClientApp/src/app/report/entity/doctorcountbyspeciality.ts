export class DoctorCountBySpeciality {

  public id !: number;
  public specialityname !: string;
  public count !: number;


  constructor(id:number,specialityname:string,count:number) {
    this.id=id;
    this.specialityname=specialityname;
    this.count=count;

  }

}
