import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Clinicroom} from "../entity/clinicroom";

@Injectable({
  providedIn: 'root'
})

export class Clinicroomservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Clinicroom>> {

    const clinicrooms = await this.http.get<Array<Clinicroom>>('http://localhost:8080/clinicrooms/list').toPromise();
    if(clinicrooms == undefined){
      return [];
    }
    return clinicrooms;
  }

}


