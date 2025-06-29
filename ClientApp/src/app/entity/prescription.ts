import {Employee} from "./employee";
import {Speciality} from "./speciality";
import {Doctorgrade} from "./doctorgrade";
import {Patientriskfactor} from "./patientriskfactor";
import {Doctordegree} from "./doctordegree";
import {Patientattendence} from "./patientattendence";
import {Prescriptionstatus} from "./prescriptionstatus";
import {Doctor} from "./doctor";
import {Prescriptiondrug} from "./prescriptiondrug";

export class Prescription {
  constructor(id: number, date: string, patientattendence: Patientattendence, prescriptionstatus: Prescriptionstatus, prescriptiondrugs: Array<Prescriptiondrug>, employee: Employee) {
    this.id = id;
    this.date = date;
    this.patientattendence = patientattendence;
    this.prescriptionstatus = prescriptionstatus;
    this.prescriptiondrugs = prescriptiondrugs;
    this.employee = employee;
  }

  public id !: number;
  public date !: string;
  public patientattendence!: Patientattendence;
  public prescriptionstatus!: Prescriptionstatus;
  public prescriptiondrugs!: Array<Prescriptiondrug>;
  public employee !: Employee;


}


