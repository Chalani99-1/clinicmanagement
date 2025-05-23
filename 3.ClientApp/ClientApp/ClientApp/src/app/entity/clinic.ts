
import {Clinictype} from "./clinictype";
import {Ward} from "./ward";
import {Clinicroom} from "./clinicroom";
import {Clinicstatus} from "./clinicstatus";
import {Employee} from "./employee";
import {Doctor} from "./doctor";

export class Clinic{

  public id !: number;
  public clinictype !: Clinictype;
  public ward !: Ward;
  public clinicroom !: Clinicroom;
  public clinicstatus !: Clinicstatus;
  public doctor !: Doctor;
  public employee !: Employee;
  public date !: string;
  public starttime !: string | null;
  public endtime !: string | null;
  public description !: string;
  public patientcount !: string;
  public dopublish !: string;

  constructor(id: number, clinictype: Clinictype, ward: Ward, clinicroom: Clinicroom, clinicstatus: Clinicstatus, doctor: Doctor, employee: Employee, date: string, starttime: string | null, endtime: string | null, description: string, patientcount: string, dopublish: string) {
    this.id = id;
    this.clinictype = clinictype;
    this.ward = ward;
    this.clinicroom = clinicroom;
    this.clinicstatus = clinicstatus;
    this.doctor = doctor;
    this.employee = employee;
    this.date = date;
    this.starttime = starttime;
    this.endtime = endtime;
    this.description = description;
    this.patientcount = patientcount;
    this.dopublish = dopublish;
  }


}





