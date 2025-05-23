import {Employee} from "../entity/employee";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Clinic} from "../entity/clinic";
import {Doctor} from "../entity/doctor";

@Injectable({
  providedIn: 'root'
})

export class Clinicservice {

  constructor(private http: HttpClient) {  }


  async getAll(query:string): Promise<Array<Clinic>> {
    const clinics = await this.http.get<Array<Clinic>>('http://localhost:8080/clinics'+query).toPromise();
    if(clinics == undefined){
      return [];
    }
    return clinics;
  }

  async add(clinic: Clinic): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/clinics', clinic).toPromise();
  }

  async update(clinic: Clinic): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/clinics', clinic).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/clinics/' + id).toPromise();
  }
}


