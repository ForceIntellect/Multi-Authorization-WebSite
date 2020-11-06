import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:"root"
})

export class DataExchangeService{
  public InitData = new BehaviorSubject(null);
  currentData = this.InitData.asObservable();

  ExchangeData(rowData){
    this.InitData.next(rowData);
  }
}
