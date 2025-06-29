import {Employee} from "./employee";
import {Userstatus} from "./userstatus";
import {Userrole} from "./userrole";
import {Usrtype} from "./usrtype";
import {Generic} from "./generic";
import {Brand} from "./brand";
import {Drugform} from "./drugform";
import {Drugstatus} from "./drugstatus";
import {Drugroute} from "./drugroute";
import {Drugcontraindication} from "./drugcontraindication";
import {Drugadverseeffect} from "./drugadverseeffect";
import {Drugindication} from "./drugindication";

export class Drug{


  public id !: number;
  public code!:string;
  public generic !:Generic;
  public brand !: Brand;
  public name !: string;
  public drugform !: Drugform;
  public drugroute !: Drugroute;
  public strength !: string;
  public photo!:string;
  public qoh!:number;
  public rop !: number;
  public drugstatus !: Drugstatus;
  public dointroduced !:string;
  public drugcontraindications!:Array<Drugcontraindication>;
  public drugadverseeffects!:Array<Drugadverseeffect>;
  public drugindications!:Array<Drugindication>;
  public employee !: Employee;

  constructor() {
  }

  // constructor(id: number, code: string, generic: Generic, brand: Brand, name: string, drugform: Drugform, drugroute: Drugroute, strength: number, photo: string, qoh: number, rop: number, drugstatus: Drugstatus, dointroduced: string, drugcontraindications: Array<Drugcontraindication>, drugadverseeffects: Array<Drugadverseeffect>, drugindications: Array<Drugindication>, employee: Employee) {
  //   this.id = id;
  //   this.code = code;
  //   this.generic = generic;
  //   this.brand = brand;
  //   this.name = name;
  //   this.drugform = drugform;
  //   this.drugroute = drugroute;
  //   this.strength = strength;
  //   this.photo = photo;
  //   this.qoh = qoh;
  //   this.rop = rop;
  //   this.drugstatus = drugstatus;
  //   this.dointroduced = dointroduced;
  //   this.drugcontraindications = drugcontraindications;
  //   this.drugadverseeffects = drugadverseeffects;
  //   this.drugindications = drugindications;
  //   this.employee = employee;
  // }




}





