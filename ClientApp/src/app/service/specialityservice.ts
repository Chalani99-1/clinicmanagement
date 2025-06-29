
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Speciality} from "../entity/speciality";

@Injectable({
  providedIn: 'root'
})

export class Specialityservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Speciality>> {

    const specialities = await this.http.get<Array<Speciality>>('http://localhost:8080/specialities/list').toPromise();
    if(specialities == undefined){
      return [];
    }
    return specialities;
  }

}


