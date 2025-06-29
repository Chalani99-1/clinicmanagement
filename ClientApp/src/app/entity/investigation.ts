import {Employee} from "./employee";
import {Speciality} from "./speciality";
import {Doctorgrade} from "./doctorgrade";
import {Patientriskfactor} from "./patientriskfactor";
import {Doctordegree} from "./doctordegree";
import {Ward} from "./ward";
import {Assignmentstatus} from "./assignmentstatus";
import {Patientattendence} from "./patientattendence";
import {Reporttype} from "./reporttype";
import {Investigationstatus} from "./investigationstatus";
import {Investigationresult} from "./investigationresult";

export class Investigation {

  public id !: number;
  public name !: string;
  public patientattendence !: Patientattendence;
  public reporteddate !: string;
  public date !: string;
  public report !: string;
  public reporttype !: Reporttype;
  public description !: string;
  public investigationstatus !: Investigationstatus;
  public investigationresult !: Investigationresult;
  public conclution !: string;
  public employee !: Employee;

  constructor(id: number, name: string, patientattendence: Patientattendence, reporteddate: string, date: string, report: string, reporttype: Reporttype, description: string, investigationstatus: Investigationstatus, investigationresult: Investigationresult, conclution: string, employee: Employee) {
    this.id = id;
    this.name = name;
    this.patientattendence = patientattendence;
    this.reporteddate = reporteddate;
    this.date = date;
    this.report = report;
    this.reporttype = reporttype;
    this.description = description;
    this.investigationstatus = investigationstatus;
    this.investigationresult = investigationresult;
    this.conclution = conclution;
    this.employee = employee;
  }



}


