import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Patientattendencestatus} from "../entity/patientattendencestatus";

@Injectable({
  providedIn: 'root'
})

export class Patientattendencestatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Patientattendencestatus>> {

    const patientattendencestatuses = await this.http.get<Array<Patientattendencestatus>>('http://localhost:8080/patientattendencestatuses/list').toPromise();
    if(patientattendencestatuses == undefined){
      return [];
    }
    return patientattendencestatuses;
  }

}


