
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Diagnosis} from "../entity/diagnosis";

@Injectable({
  providedIn: 'root'
})

export class Diagnosisservice {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/diagnoses/' + id).toPromise();
  }

  async update(diagnosis: Diagnosis): Promise<[]|undefined>{
    //console.log("Employee Updating-"+employee.id);
    return this.http.put<[]>('http://localhost:8080/diagnoses', diagnosis).toPromise();
  }

  async getAll(query:string): Promise<Array<Diagnosis>> {
    const diagnoses = await this.http.get<Array<Diagnosis>>('http://localhost:8080/diagnoses'+query).toPromise();
    if(diagnoses == undefined){
      return [];
    }
    return diagnoses;
  }

  async add(diagnosis: Diagnosis): Promise<[]|undefined>{
    // console.log("aaaa");
    console.log(diagnosis);
    return this.http.post<[]>('http://localhost:8080/diagnoses', diagnosis).toPromise();
  }


}


