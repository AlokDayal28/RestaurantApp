import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Designation, Employee } from './employee.model';
import { Customermodel } from './Models/customermodel.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  constructor(private myhttp:HttpClient) { }
  customerUrl:string='https://localhost:7282/api/Customer';
  //designationUrl:string='https://localhost:7285/api/Employee';
  //listEmployee:Employee[]=[]; //For Getting Data EmployeeList
  listCustomer:Customermodel[]=[];
  //employeeData:Employee=new Employee(); //for post data / Insert data

  /* saveEmployee()
  {
    console.log('Add');
    console.log(this.employeeUrl);
    console.log(this.employeeData);
    return this.myhttp.post(this.employeeUrl,this.employeeData);
  } */

  /* updateEmployee()
  {
    console.log('Edit');
    console.log(this.employeeUrl);
    console.log(this.employeeData);
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}` ,this.employeeData);
  } */
  /* getEmployees():Observable<Employee[]>
  {
    return this.myhttp.get<Employee[]>(this.employeeUrl+"/getemployee");
  } */
  getCustomers():Observable<Customermodel[]>
  {
    return this.myhttp.get<Customermodel[]>(this.customerUrl);
  }

  /* fetchAndStoreDesignations(): void {
    this.getDesignations().subscribe(
      (designations: Designation[]) => {
        this.listDesignation = designations;
      },
      (error) => {
        console.error('Error fetching designations:', error);
      }
    );
  } */
  /* fetchAndStoreEmployees(): void {
    this.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.listEmployee = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  } */

  /* deleteEmployee(id:number)
  {
    return this.myhttp.delete(`${this.employeeUrl}/${id}`);
  } */
 }
