import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Clinictype} from "../entity/clinictype";

@Injectable({
  providedIn: 'root'
})

export class Clinictypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Clinictype>> {

    const clinictypes = await this.http.get<Array<Clinictype>>('http://localhost:8080/clinictypes/list').toPromise();
    if(clinictypes == undefined){
      return [];
    }
    return clinictypes;
  }

}


