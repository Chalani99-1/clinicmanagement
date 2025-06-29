
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Contrantindication} from "../entity/contrantindication";

@Injectable({
  providedIn: 'root'
})

export class Contrantindicationservice{

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Contrantindication>> {

    const contrantindications = await this.http.get<Array<Contrantindication>>('http://localhost:8080/contrantindications/list').toPromise();
    if(contrantindications == undefined){
      return [];
    }
    return contrantindications;
  }

}


