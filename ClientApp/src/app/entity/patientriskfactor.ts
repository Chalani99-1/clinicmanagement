import {Patient} from "./patient";
import {Riskfactor} from "./riskfactor";

export class Patientriskfactor {

  public riskfactor ! : Riskfactor;


  constructor(riskfactor: Riskfactor) {
    this.riskfactor = riskfactor;
  }
}


