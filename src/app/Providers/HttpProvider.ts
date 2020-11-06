import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SpinnerProvider } from "./spinnerProvider";
//import  Configuration from '../../assets/Configuration.json';

@Injectable()
export class BaseHttpService {
  private Configuration: any;

  BaseUrl = "";

  constructor(private http: HttpClient, private spinner: SpinnerProvider) {}

  setupApi() {
    this.SpinnerRef = this.spinner;

    console.log(window.location.host);
    // console.log(data)
    // const h = require('../../assets/Configuration.json')
    if (this.IsStatic()) {
      this.BaseUrl = this.Configuration.StaticURL;
    } else {
      this.BaseUrl = this.Configuration.LocalURL;
    }

    console.log(this.BaseUrl);
  }

  loadAppConfig() {
    return this.http
      .get("/assets/Configuration.json")
      .toPromise()
      .then((data) => {
        this.Configuration = data;
        this.setupApi();
      });
  }

  htppTimeOut = null;

  httpCount = 0;

  SpinnerRef: SpinnerProvider;

  post(url, paras: any, callback, respondOnError?) {
    let data = Object.assign({}, paras);
    data = this._FormatData(data);

    try {
      this.httpCount += 1;
      // this.UpdateSpinnerStatus()
      setTimeout(() => {
        this.http.post(this.BaseUrl + url, data).subscribe(
          (datas) => {
            setTimeout(() => {
              this.httpCount -= 1;
              this.UpdateSpinnerStatus();
              callback(datas);
            }, 400);
          },
          (error) => {
            this.httpCount -= 1;
            // this.UpdateSpinnerStatus()

            if (!respondOnError)
              alert("An Error Occured. " + error.error.Message);
            else callback(error.error);
          }
        );
      }, 10);
    } catch (es) {
      console.error(es);
    }
  }

  private UpdateSpinnerStatus() {
    // console.log(this.httpCount)
    // if(this.httpCount <= 0){
    //     this.SpinnerRef.close()
    // }
    // else{
    //         this.SpinnerRef.openDialog()
    // }
  }

  search(url, paras: any, callback) {
    let data = Object.assign({}, paras);
    data = this._FormatData(data);

    if (this.htppTimeOut != null) {
      clearTimeout(this.htppTimeOut);
    }

    this.htppTimeOut = setTimeout(() => {
      this.post(url, paras, callback);

      this.htppTimeOut = null;
    }, 800);
  }

  private _FormatData(data): any {
    for (let d in data) {
      if (data[d] instanceof Date) {
        let g: any = new Date(data[d]).getFullYear() + "-";
        g =
          g +
          (
            0 +
            (parseFloat(new Date(data[d]).getMonth().toString()) + 1).toString()
          ).slice(-2) +
          "-";
        g = g + (0 + new Date(data[d]).getDate().toString()).slice(-2) + " ";
        g = g + (0 + new Date(data[d]).toLocaleTimeString()).slice(-11);
        //data[d]= new Date(data[d]).toDateString()+' '+new Date(data[d]).toLocaleTimeString();
        data[d] = g;
        //    alert(new Date(data[d]).toLocaleTimeString())
      }

      if (data[d] instanceof Array) {
        data[d].forEach((element) => {
          element = this._FormatData(element);
        });
      }
    }

    return data;
  }

  private IsStatic() {
    let host = window.location.host.split(":")[0];
    let IsStatic = true;

    if (
      (host.split(".")[0] == "192" && host.split(".")[1] == "168") ||
      host == "localhost"
    ) {
      IsStatic = false;
    }

    return IsStatic;
  }

  public ConvertToYYYYMMDDFormat(str: string) {
    //console.log(str, "Date");
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
  }
}
