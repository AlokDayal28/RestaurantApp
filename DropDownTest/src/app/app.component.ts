import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpErrorResponse } from '@angular/common/http/src/response';
import{Customermodel} from './Models/customermodel.model';
import { CustomerServiceService } from './customerservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 4 ngFor Example with SELECT Dropdown List';
  custId:number=0;
  constructor (private httpService: HttpClient, public custService:CustomerServiceService) { }

  //myCustomers: Customermodel[]=[];
  selected = null;
lstCustomer:Customermodel[]=[];
  async ngOnInit () {
    /* this.custService.getCustomers().subscribe(data=> {
      this.custService.listCustomer=data;
      console.log('data start');
      console.log(data);
      console.log('data end');
  });*/
  this.loadCustomers().subscribe(data => {
    this.lstCustomer = data;
  });
  }
  loadCustomers(){
    return this.httpService.get<Customermodel[]>("https://localhost:7282/api/customer");
    }

}
