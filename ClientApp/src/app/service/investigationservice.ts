import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Investigation} from "../entity/investigation";

@Injectable({
  providedIn: 'root'
})

export class Investigationservice {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Investigation>> {
    const investigations = await this.http.get<Array<Investigation>>('http://localhost:8080/investigations'+query).toPromise();
    if(investigations == undefined){
      return [];
    }
     return investigations;
   }

  async add(investigation: Investigation): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/investigations', investigation).toPromise();
  }

  async update(investigation: Investigation): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/investigations', investigation).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/investigations/' + id).toPromise();
  }

}


