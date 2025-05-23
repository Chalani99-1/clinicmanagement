import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Drugstatus} from "../entity/drugstatus";

@Injectable({
  providedIn: 'root'
})

export class Drugstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Drugstatus>> {

    const drugstatuses = await this.http.get<Array<Drugstatus>>('http://localhost:8080/drugstatuses/list').toPromise();
    if(drugstatuses == undefined){
      return [];
    }
    return drugstatuses;
  }

}


