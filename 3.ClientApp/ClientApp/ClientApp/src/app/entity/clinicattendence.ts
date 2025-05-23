import {Employee} from "./employee";
import {Clinic} from "./clinic";
import {Patient} from "./patient";
import {Patientattendencestatus} from "./patientattendencestatus";

export class Clinicattendence{

  public id !: number;
  public employee !: Employee;
  public starttime !: string;
  public endtime !: string;
  public description !: string;
  public clinic !: Clinic;

  constructor(id: number, employee: Employee, starttime: string, endtime: string, description: string, clinic: Clinic) {
    this.id = id;
    this.employee = employee;
    this.starttime = starttime;
    this.endtime = endtime;
    this.description = description;
    this.clinic = clinic;
  }



}





