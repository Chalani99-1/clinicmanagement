import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {District} from "../entity/district";
import {University} from "../entity/university";

@Injectable({
  providedIn: 'root'
})

export class Universityservice{

  constructor(private http: HttpClient) {  }

  async getAllList(query:string): Promise<Array<University>> {

    const universities = await this.http.get<Array<University>>('http://localhost:8080/universities/list'+query).toPromise();
    if(universities == undefined){
      return [];
    }
    return universities;
  }

}


