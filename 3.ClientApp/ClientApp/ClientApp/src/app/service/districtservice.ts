import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {District} from "../entity/district";

@Injectable({
  providedIn: 'root'
})

export class Districtservice{

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<District>> {

    const districts = await this.http.get<Array<District>>('http://localhost:8080/districts/list').toPromise();
    if(districts == undefined){
      return [];
    }
    return districts;
  }

}


