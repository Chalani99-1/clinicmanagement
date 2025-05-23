import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {District} from "../entity/district";
import {Degree} from "../entity/degree";

@Injectable({
  providedIn: 'root'
})

export class Degreeservice{

  constructor(private http: HttpClient) {  }

  async getAllList(query:string): Promise<Array<Degree>> {

    const degrees = await this.http.get<Array<Degree>>('http://localhost:8080/degrees/list'+query).toPromise();
    if(degrees == undefined){
      return [];
    }
    return degrees;
  }

}


