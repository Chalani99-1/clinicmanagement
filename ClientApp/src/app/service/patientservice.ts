
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Patient} from "../entity/patient";
import {User} from "../entity/user";
import {Employee} from "../entity/employee";

@Injectable({
  providedIn: 'root'
})

export class Patientservice {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Patient>> {
    const patients = await this.http.get<Array<Patient>>('http://localhost:8080/patients'+query).toPromise();
    if(patients == undefined){
      return [];
    }
    return patients;
  }

  async add(patient: Patient): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/patients', patient).toPromise();
  }

  async update(patient: Patient): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/patients', patient).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/patients/' + id).toPromise();
  }


}


