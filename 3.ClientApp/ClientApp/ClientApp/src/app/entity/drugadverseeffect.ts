import {Role} from "./role";
import {User} from "./user";
import {Adverseeffect} from "./adverseeffect";

export class Drugadverseeffect {

  public adverseeffect !: Adverseeffect;

  constructor(adverseeffect:Adverseeffect) {
    this.adverseeffect=adverseeffect;
  }

}


