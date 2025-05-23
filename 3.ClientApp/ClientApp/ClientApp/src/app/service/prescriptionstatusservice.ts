import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Prescriptionstatus} from "../entity/prescriptionstatus";

@Injectable({
  providedIn: 'root'
})

export class Prescriptionstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Prescriptionstatus>> {

    const prescriptionstatuses = await this.http.get<Array<Prescriptionstatus>>('http://localhost:8080/prescriptionstatuses/list').toPromise();
    if(prescriptionstatuses == undefined){
      return [];
    }
    return prescriptionstatuses;
  }

}


