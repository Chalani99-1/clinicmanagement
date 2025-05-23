import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {District} from "../entity/district";
import {Degree} from "../entity/degree";
import {Drugshedule} from "../entity/drugshedule";

@Injectable({
  providedIn: 'root'
})

export class Drugsheduleservice{

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Drugshedule>> {

    const drugshedules = await this.http.get<Array<Drugshedule>>('http://localhost:8080/drugshedules/list').toPromise();
    if(drugshedules == undefined){
      return [];
    }
    return drugshedules;
  }

}


