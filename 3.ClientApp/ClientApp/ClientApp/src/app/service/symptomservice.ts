import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Userstatus} from "../entity/userstatus";
import {Role} from "../entity/role";
import {Symptom} from "../entity/symptom";

@Injectable({
  providedIn: 'root'
})

export class Symptomservice{

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Symptom>> {

    const symptoms = await this.http.get<Array<Symptom>>('http://localhost:8080/symptoms/list').toPromise();
    if(symptoms == undefined){
      return [];
    }
    return symptoms;
  }

}


