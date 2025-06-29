import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Assignmentstatus} from "../entity/assignmentstatus";

@Injectable({
  providedIn: 'root'
})

export class Assignmentstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Assignmentstatus>> {

    const assignmentstatuses = await this.http.get<Array<Assignmentstatus>>('http://localhost:8080/assignmentstatuses/list').toPromise();
    if(assignmentstatuses == undefined){
      return [];
    }
    return assignmentstatuses;
  }

}


