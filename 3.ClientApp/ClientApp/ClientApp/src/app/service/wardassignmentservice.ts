import {Employee} from "../entity/employee";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Gender} from "../entity/gender";
import {Doctor} from "../entity/doctor";
import {Patient} from "../entity/patient";
import {Wardassignment} from "../entity/wardassignment";

@Injectable({
  providedIn: 'root'
})

export class Wardassignmentservice {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Wardassignment>> {
    const wardassignments = await this.http.get<Array<Wardassignment>>('http://localhost:8080/wardassignments'+query).toPromise();
    if(wardassignments == undefined){
      return [];
    }
     return wardassignments;
   }

  async add(wardassignment: Wardassignment): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/wardassignments', wardassignment).toPromise();
  }

  async update(wardassignment: Wardassignment): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/wardassignments', wardassignment).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/wardassignments/' + id).toPromise();
  }

}


