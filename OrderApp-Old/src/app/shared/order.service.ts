import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];
  orderList:Order[]=[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.apiURL + '/Order', body);
  }

  /* getOrderList() {
    return this.http.get(environment.apiURL + '/Order').toPromise();
  } */
  getOrderList():Observable<Order[]>
  {
    return this.http.get<Order[]>(environment.apiURL+'/Order');
  }

  /* getOrderByID(id:number):any {
    return this.http.get(environment.apiURL + '/Order/'+id).toPromise();
  } */

  getOrderByID(id:number):any
  {
    return this.http.get<Order>(environment.apiURL+'/Order/'+id).toPromise;
  }

  deleteOrder(id:number) {
    return this.http.delete(environment.apiURL + '/Order/'+id).toPromise();
  }

}
