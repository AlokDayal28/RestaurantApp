import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];
  OrderItemsArray:any[]=[];
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    this.OrderItemsArray=this.orderItems.map((res) => {
      const { Price, Total, ...rest } = res;
      return rest;
  });
  var orderItemsBody={
    ...this.formData,OrderItems:this.OrderItemsArray};

    orderItemsBody.CustomerID=+orderItemsBody.CustomerID;
    orderItemsBody.OrderID=+orderItemsBody.OrderID;
    return this.http.post(environment.apiURL + '/Order', orderItemsBody);
  }

  getOrderList() {
    return this.http.get(environment.apiURL + '/Order').toPromise();
  }

  getOrderByID(id:number):any {
    return this.http.get(environment.apiURL + '/Order/'+id).toPromise();
  }

  deleteOrder(id:number) {
    return this.http.delete(environment.apiURL + '/Order/'+id).toPromise();
  }

}
