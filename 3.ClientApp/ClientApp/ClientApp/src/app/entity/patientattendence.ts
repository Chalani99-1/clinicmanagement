import {Employee} from "./employee";
import {Clinic} from "./clinic";
import {Patient} from "./patient";
import {Patientattendencestatus} from "./patientattendencestatus";

export class Patientattendence{

  public id !: number;
  public clinic !: Clinic;
  public patient !: Patient;
  public date !: string;
  public timein !: string;
  public timeout !: string;
  public patientattendencestatus !: Patientattendencestatus;
  public employee !: Employee;
  public description !: string;

  constructor(id: number, clinic: Clinic, patient: Patient, date: string, timein: string, timeout: string, patientattendencestatus: Patientattendencestatus, employee: Employee, description: string) {
    this.id = id;
    this.clinic = clinic;
    this.patient = patient;
    this.date = date;
    this.timein = timein;
    this.timeout = timeout;
    this.patientattendencestatus = patientattendencestatus;
    this.employee = employee;
    this.description = description;
  }




}





