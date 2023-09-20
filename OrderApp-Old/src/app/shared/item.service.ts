import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Item} from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
itemList:Item[]=[];
  constructor(private http:HttpClient) { }

  /* getItemList(){
   return this.http.get(environment.apiURL+'/Item').toPromise();
  } */

  getItemList():Observable<Item[]>
  {
    return this.http.get<Item[]>(environment.apiURL+'/Item');
  }
}
