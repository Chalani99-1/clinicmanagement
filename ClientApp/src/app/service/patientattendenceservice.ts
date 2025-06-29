
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Patientattendence} from "../entity/patientattendence";

@Injectable({
  providedIn: 'root'
})

export class Patientattendenceservice{

  constructor(private http: HttpClient) {  }


  async getAll(query:string): Promise<Array<Patientattendence>> {
    const patientattendences = await this.http.get<Array<Patientattendence>>('http://localhost:8080/patientattendences'+query).toPromise();
    if(patientattendences == undefined){
      return [];
    }
    return patientattendences;
  }

  async add(patientattendence: Patientattendence): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/patientattendences', patientattendence).toPromise();
  }

  async update(patientattendence: Patientattendence): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/patientattendences', patientattendence).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/patientattendences/' + id).toPromise();
  }
}


