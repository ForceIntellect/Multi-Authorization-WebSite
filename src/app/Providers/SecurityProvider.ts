import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseHttpService } from "./HttpProvider";
import { Response_Type, LoginDetail } from "../base/BaseClasses";

@Injectable()
export class SecurityService {
  constructor(private router: Router, private http: BaseHttpService) {}

  private _LoginNo: number;
  public get LoginNo(): number {
    //this._LoginNo = atob(localStorage.getItem("LoginNo"));

    console.log(localStorage.getItem("LoginNo"));

    if (localStorage.getItem("LoginNo"))
      return parseInt(atob(localStorage.getItem("LoginNo")));
    else {
      this.router.navigate(["PageNotFound"]);
      // router.navigateByUrl('../PageNotFound')
      throw "Not Logged In.";
    }

    //  return "1";
  }
  public set LoginNo(LoginNo) {
    this._LoginNo = LoginNo;

    try {
      if (!LoginNo) {
        throw "Invalid Login " + LoginNo;
      }

      localStorage.setItem("LoginNo", btoa(LoginNo.toString()));
    } catch (es) {
      es.message = "Error in Login";
      console.error(es);
    }
  }

  public logout(): void {
    localStorage.removeItem("LoginNo");
    localStorage.clear();
    this.router.navigate(["Login"]);
    // this.router.navigate(['Logout'])
    //  window.open("http://Localhost:4210/Logout","_self")
  }

  public getLocalUserData() {
    try {
      let h = parseInt(atob(localStorage.getItem("LoginNo")));

      return h;
    } catch (es) {
      console.log(es);
      return null; //alert(jsObjectToString(es))
    }
  }

  public updateLocalUserData(userData: Number) {
    try {
      if (!userData) throw "Invalid user data unable to save on local device";

      localStorage.setItem("LoginNo", btoa(userData.toString()));
    } catch (es) {
      console.log(es);
      return null; //alert(jsObjectToString(es))
    }
  }

  validateLogin(user: LoginDetail, cb: (response: Response_Type) => void) {
    // let para={

    //     LoginID :user.UserID,
    //     Password:user.Password
    // }
    let result: Response_Type = new Response_Type();
    // /api/Security/LoginSelect
    this.http.post(
      "/api/Security/LoginSelect",
      user,
      (response) => {
        if (response.StatusNo == 1) {
          result.StatusNo = 1;
          result.Message = "login Successfull.";
          result.Data = response.Data;
        } else {
          result.StatusNo = 0;
          result.Message = response.Message;
        }

        cb(result);
      },
      true
    );
  }

  public mainLogin(loginDetail: LoginDetail, cb) {
    this.validateLogin(loginDetail, (response: Response_Type) => {
      if (response.StatusNo == 0) {
        cb(response);
      } else {
        let usr: Number;

        usr = parseInt(response.Data.toString());
        // usr.UserID= response.Data.Table[0].LoginID
        // usr.PrintingName= response.Data.Table[0].PrintingName
        // usr.IsVendorLogin= response.Data.Table[0].IsVendorLogin
        // usr.Password = loginDetail.Pwd;

        console.log(response);

        this.updateLocalUserData(usr);

        cb(this.getLocalUserData());
      }
    });
  }

  public loginfillvalues(cb) {
    let result: Response_Type = new Response_Type();

    this.http.post(
      "/api/Security/LoginFillValues",
      { LoginNo: null },
      (response) => {
        if (response.Table[0].CompanyNo) {
          result.StatusNo = 1;
          result.Message = "login Fillvalues Successfull.";
          result.Data = response.Table[0].CompanyName;
        } else {
          result.StatusNo = 0;
          result.Message = "Login Fillvalues Failed.";
        }

        cb(result);
      },
      true
    );
  }

  public loadAuthorizationMenu(LoginNo: number, cb) {
    this.http.post(
      "/api/Security/AuthMenuSelect",
      { LoginNo: LoginNo },
      (response) => {
        cb(response);
      },
      true
    );
  }
}
