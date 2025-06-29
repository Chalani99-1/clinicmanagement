import {Degree} from "./degree";
import {University} from "./university";
import {Doctor} from "./doctor";
import {Drugshedule} from "./drugshedule";
import {Drug} from "./drug";
import {Meal} from "./meal";
import {Prescription} from "./prescription";

export class Prescriptiondrug {

  public id !: number;
  public dose!: string;
  public description !: string;
  public days !: number;
  public drug !: Drug;
  public drugshedule !: Drugshedule;
  public meal !: Meal;
  public prescription !: Prescription


  constructor(id: number, dose: string, description: string, days: number, drug: Drug, drugshedule: Drugshedule, meal: Meal, prescription: Prescription) {
    this.id = id;
    this.dose = dose;
    this.description = description;
    this.days = days;
    this.drug = drug;
    this.drugshedule = drugshedule;
    this.meal = meal;
    this.prescription = prescription;
  }




}


