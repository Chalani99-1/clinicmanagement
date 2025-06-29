import {Role} from "./role";
import {User} from "./user";
import {Allergy} from "./allergy";

export class Allergydiagnosis {

  public allergy !: Allergy;

  constructor(allergy:Allergy) {
    this.allergy=allergy;
  }

}


