import {Employee} from "../entity/employee";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Drug} from "../entity/drug";

@Injectable({
  providedIn: 'root'
})

export class Drugservice {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/drugs/' + id).toPromise();
  }

  async update(drug: Drug): Promise<[]|undefined>{
    //console.log("Employee Updating-"+employee.id);
    return this.http.put<[]>('http://localhost:8080/drugs', drug).toPromise();
  }

  async getAll(query:string): Promise<Array<Drug>> {
    const drugs = await this.http.get<Array<Drug>>('http://localhost:8080/drugs'+query).toPromise();
    if(drugs == undefined){
      return [];
    }
    return drugs;
  }

  async add(drug: Drug): Promise<[]|undefined>{
   //  console.log("aaaa");
    console.log(drug);
    return this.http.post<[]>('http://localhost:8080/drugs', drug).toPromise();
  }


}


