import {Degree} from "./degree";
import {University} from "./university";
import {Doctor} from "./doctor";

export class Doctordegree {

  public id !: number;
  public doctor!: Doctor;
  public degree !: Degree;
  public university !: University;
  public year !: string;

  constructor(id:number,doctor:Doctor,degree:Degree,university:University,year:string) {
    this.id=id;
    this.doctor=doctor;
    this.degree = degree;
    this.university=university;
    this.year=year;
  }

}


