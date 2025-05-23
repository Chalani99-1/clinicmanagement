import {Employee} from "../entity/employee";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Gender} from "../entity/gender";
import {Doctor} from "../entity/doctor";
import {Patient} from "../entity/patient";

@Injectable({
  providedIn: 'root'
})

export class Doctorservice {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Doctor>> {
    const doctors = await this.http.get<Array<Doctor>>('http://localhost:8080/doctors'+query).toPromise();
    if(doctors == undefined){
      return [];
    }
     return doctors;
   }

  async add(doctor: Doctor): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/doctors', doctor).toPromise();
  }

  async update(doctor: Doctor): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/doctors', doctor).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/doctors/' + id).toPromise();
  }
  // async delete(id: number): Promise<[]|undefined>{
  //   // @ts-ignore
  //   return this.http.delete('http://localhost:8080/employees/' + id).toPromise();
  // }
  //
  // async update(employee: Employee): Promise<[]|undefined>{
  //   //console.log("Employee Updating-"+employee.id);
  //   return this.http.put<[]>('http://localhost:8080/employees', employee).toPromise();
  // }
  //
  //
  // async getAll(query:string): Promise<Array<Employee>> {
  //   const employees = await this.http.get<Array<Employee>>('http://localhost:8080/employees'+query).toPromise();
  //   if(employees == undefined){
  //     return [];
  //   }
  //   return employees;
  // }
  //
  // async getAllListNameId(): Promise<Array<Employee>> {
  //
  //   const employees = await this.http.get<Array<Employee>>('http://localhost:8080/employees/list').toPromise();
  //   if(employees == undefined){
  //     return [];
  //   }
  //   return employees;
  // }
  //
  // async add(employee: Employee): Promise<[]|undefined>{
  //   //console.log("Employee Adding-"+JSON.stringify(employee));
  //   //employee.number="47457";
  //   return this.http.post<[]>('http://localhost:8080/employees', employee).toPromise();
  // }

}


