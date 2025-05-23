
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Clinicattendence} from "../entity/clinicattendence";

@Injectable({
  providedIn: 'root'
})

export class Clinicattendenceservice{

  constructor(private http: HttpClient) {  }


  async getAll(query:string): Promise<Array<Clinicattendence>> {
    const clinicattendences = await this.http.get<Array<Clinicattendence>>('http://localhost:8080/clinicattendences'+query).toPromise();
    if(clinicattendences == undefined){
      return [];
    }
    return clinicattendences;
  }

  async add(clinicattendence: Clinicattendence): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/clinicattendences', clinicattendence).toPromise();
  }

  async update(clinicattendence: Clinicattendence): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/clinicattendences', clinicattendence).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/clinicattendences/' + id).toPromise();
  }
}


