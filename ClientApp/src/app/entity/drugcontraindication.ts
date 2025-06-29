import {Role} from "./role";
import {User} from "./user";
import {Contrantindication} from "./contrantindication";

export class Drugcontraindication {

  public contraindication !: Contrantindication;

  constructor(contraindication:Contrantindication) {
    this.contraindication=contraindication;
  }

}


