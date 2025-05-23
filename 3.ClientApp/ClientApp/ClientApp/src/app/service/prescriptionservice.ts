import {Employee} from "../entity/employee";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Gender} from "../entity/gender";
import {Doctor} from "../entity/doctor";
import {Patient} from "../entity/patient";
import {Prescription} from "../entity/prescription";

@Injectable({
  providedIn: 'root'
})

export class Prescriptionservice {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Prescription>> {
    const prescriptions = await this.http.get<Array<Prescription>>('http://localhost:8080/prescriptions'+query).toPromise();
    if(prescriptions == undefined){
      return [];
    }
     return prescriptions;
   }

  async add(prescription: Prescription): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/prescriptions', prescription).toPromise();
  }

  async update(prescription: Prescription): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/prescriptions', prescription).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/prescriptions/' + id).toPromise();
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


