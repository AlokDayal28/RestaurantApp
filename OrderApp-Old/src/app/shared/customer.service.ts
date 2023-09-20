import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Customer} from './customer.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
customerList:Customer[]=[];
  constructor(private http : HttpClient) { }

  /* getCustomerList(){
    return this.http.get(environment.apiURL+'/Customer').toPromise();
   } */

   /* getCustomerList():Observable<Customer[]>
  {
    return this.http.get<Customer[]>(environment.apiURL+'/Customer');
  } */
  getCustomerList():any
  {
    return this.http.get<Customer>(environment.apiURL).toPromise;
  }
}
