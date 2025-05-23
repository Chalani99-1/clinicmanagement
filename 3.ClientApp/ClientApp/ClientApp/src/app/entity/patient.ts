import {Gender} from "./gender";
import {Designation} from "./designation";
import {Empstatus} from "./empstatus";
import {Emptype} from "./emptype";
import {District} from "./district";
import {Bloodgroup} from "./bloodgroup";
import {Patientstatus} from "./patientstatus";
import {Employee} from "./employee";
import {Userrole} from "./userrole";
import {Patientriskfactor} from "./patientriskfactor";

export class Patient{

  public id !: number;
  public regno !: string;
  public name !: string;
  public gender !: Gender;
  public dob !: string;
  public nic !: string;
  public photo !: string;
  public address !: string;
  public contactnumber !: string;
  public district !: District;
  public guardianname !: string;
  public guardiancontact!: string;
  public description !: string;
  public bloodgroup !: Bloodgroup;
  public patientriskfactors!:Array<Patientriskfactor>;
  public patientstatus !: Patientstatus;
  public employee !: Employee;

  constructor() {
  }
  // constructor(id:number,regno:string, name:string, gender:Gender,
  //             dob:string, nic:string,photo:string,address:string,contactnumber:string,district:District,guardianname:string,guardiancontact:string,description:string,bloodgroup:Bloodgroup,patientriskfactors:Array<Patientriskfactor>, patientstatus:Patientstatus,employee:Employee
  // ){
  //
  //
  //   this.id=id;
  //   this.regno=regno;
  //   this.name=name;
  //   this.gender=gender;
  //   this.dob=dob;
  //   this.nic = nic;
  //   this.photo=photo;
  //   this.address=address;
  //   this.contactnumber=contactnumber;
  //   this.district=district;
  //   this.guardianname=guardianname;
  //   this.guardiancontact=guardiancontact;
  //   this.description=description;
  //   this.bloodgroup=bloodgroup;
  //   this.patientriskfactors=patientriskfactors;
  //   this.patientstatus=patientstatus;
  //   this.employee=employee;
  // }



}




