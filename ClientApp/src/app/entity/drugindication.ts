import {Role} from "./role";
import {User} from "./user";
import {Indication} from "./indication";

export class Drugindication {

  public indication !: Indication;

  constructor(indication:Indication) {
    this.indication=indication;
  }

}


