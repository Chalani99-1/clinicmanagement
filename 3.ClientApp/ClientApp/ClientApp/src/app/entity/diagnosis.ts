import {Employee} from "./employee";
import {Severity} from "./severity";
import {Allergydiagnosis} from "./allergydiagnosis";
import {Treatmentplan} from "./treatmentplan";
import {Diagnosisstatus} from "./diagnosisstatus";
import {Patient} from "./patient";
import {Diseasediagnosis} from "./diseasediagnosis";
import {Symptomdiagnosis} from "./symptomdiagnosis";

export class Diagnosis{

  public id !: number;
  public onsetduration!:string;
  public disease !: string;
  public bplevel !: number;
  public bloodpressure !: string;
  public heartrate !: string;
  public temperature !: string;
  public respiratoryrate !: string;
  public height !: string;
  public weight !: string;
  public examination !: string;
  public allergy !: string;
  public medicalhistory !: string;
  public surgicalhistory !: string;
  public doctornote !: string;
  public description !:string;
  public time !:string;
  public allergydiagnoses!:Array<Allergydiagnosis>;
  public severity !: Severity;
  public treatmentplan !: Treatmentplan;
  public diagnosisstatus !: Diagnosisstatus;
  public employee !: Employee;
  public patient !: Patient;
  public diseasediagnoses!:Array<Diseasediagnosis>;
  public symptomdiagnoses!: Array<Symptomdiagnosis>;

  constructor() {
  }

  // constructor(id: number, onsetduration: string, disease: string, bplevel: number, bloodpressure: string, heartrate: string, temperature: string, respiratoryrate: string, height: string, weight: string, examination: string, alergy: string, medicalhistory: string, surgicalhistory: string, doctornote: string, description: string, time: string, allergydiagnoses: Array<Allergydiagnosis>, severity: Severity, treatmentplan: Treatmentplan, diagnosisstatus: Diagnosisstatus, employee: Employee, patient: Patient, diseasediagnoses: Array<Diseasediagnosis>, symptomdiagnoses: Array<Symptomdiagnosis>) {
  //   this.id = id;
  //   this.onsetduration = onsetduration;
  //   this.disease = disease;
  //   this.bplevel = bplevel;
  //   this.bloodpressure = bloodpressure;
  //   this.heartrate = heartrate;
  //   this.temperature = temperature;
  //   this.respiratoryrate = respiratoryrate;
  //   this.height = height;
  //   this.weight = weight;
  //   this.examination = examination;
  //   this.allergy = alergy;
  //   this.medicalhistory = medicalhistory;
  //   this.surgicalhistory = surgicalhistory;
  //   this.doctornote = doctornote;
  //   this.description = description;
  //   this.time = time;
  //   this.allergydiagnoses = allergydiagnoses;
  //   this.severity = severity;
  //   this.treatmentplan = treatmentplan;
  //   this.diagnosisstatus = diagnosisstatus;
  //   this.employee = employee;
  //   this.patient = patient;
  //   this.diseasediagnoses = diseasediagnoses;
  //   this.symptomdiagnoses = symptomdiagnoses;
  // }
  //


}





