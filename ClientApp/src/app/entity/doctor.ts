import {Employee} from "./employee";
import {Speciality} from "./speciality";
import {Doctorgrade} from "./doctorgrade";
import {Patientriskfactor} from "./patientriskfactor";
import {Doctordegree} from "./doctordegree";
import {Country} from "./country";

export class Doctor {

  public id !: number;
  public employee !: Employee;
  public speciality !: Speciality;
  public doctordegrees!:Array<Doctordegree>;
  public doctorgrade !: Doctorgrade;
  public description !: string;
  public slmcregno !: string;
  public doslmcregisterd !: string;
  public foreigntraining !: string;
  public country !: (Country | undefined)[];
  public degreeyear!: string;


  constructor(id: number, employee: Employee, speciality: Speciality,doctordegrees:Array<Doctordegree>, doctorgrade: Doctorgrade, description: string, slmcregno: string, doslmcregisterd: string, foreigntraining: string, country: Array<Country>, degreeyear: string) {
    this.id = id;
    this.employee = employee;
    this.speciality = speciality;
    this.doctordegrees = doctordegrees;
    this.doctorgrade = doctorgrade;
    this.description = description;
    this.slmcregno = slmcregno;
    this.doslmcregisterd = doslmcregisterd;
    this.foreigntraining = foreigntraining;
    this.country = country;
    this.degreeyear = degreeyear;
  }
}


