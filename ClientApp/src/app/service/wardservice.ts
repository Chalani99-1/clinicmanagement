import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Ward} from "../entity/ward";

@Injectable({
  providedIn: 'root'
})

export class Wardservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Ward>> {

    const wards = await this.http.get<Array<Ward>>('http://localhost:8080/wards/list').toPromise();
    if(wards == undefined){
      return [];
    }
    return wards;
  }

}


