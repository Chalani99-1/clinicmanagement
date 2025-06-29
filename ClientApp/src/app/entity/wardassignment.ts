import {Employee} from "./employee";
import {Speciality} from "./speciality";
import {Doctorgrade} from "./doctorgrade";
import {Patientriskfactor} from "./patientriskfactor";
import {Doctordegree} from "./doctordegree";
import {Ward} from "./ward";
import {Assignmentstatus} from "./assignmentstatus";

export class Wardassignment {

  public id !: number;
  public assignmentdate !: string;
  public resignateddate !: string;
  public ward !: Ward;
  public employee !: Employee;
  public assignmentstatus !: Assignmentstatus;
  public description !: string;


  constructor(id: number, assignmentdate: string, resignateddate: string, ward: Ward, employee: Employee, assignmentstatus: Assignmentstatus, description: string) {
    this.id = id;
    this.assignmentdate = assignmentdate;
    this.resignateddate = resignateddate;
    this.ward = ward;
    this.employee = employee;
    this.assignmentstatus = assignmentstatus;
    this.description = description;
  }

}


