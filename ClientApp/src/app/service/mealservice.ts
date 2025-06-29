import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {District} from "../entity/district";
import {Degree} from "../entity/degree";
import {Meal} from "../entity/meal";

@Injectable({
  providedIn: 'root'
})

export class Mealservice{

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Meal>> {

    const meals = await this.http.get<Array<Meal>>('http://localhost:8080/meals/list').toPromise();
    if(meals == undefined){
      return [];
    }
    return meals;
  }

}


