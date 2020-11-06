import { Injectable } from "@angular/core";
import { ToastrService, IndividualConfig } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})

export class BaseToastService {
  options: IndividualConfig;
  opt: IndividualConfig;

  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
     this.options.timeOut = 4000;
    this.options.positionClass = "toast-top-right";
    this.options.closeButton = true;
    this.options.progressAnimation = "decreasing";
  }

  ShowToast(type: number, msg: string, title: string) {
    switch (type) {
      case 0:
        //this.opt = this.toastr.toastrConfig;
        //this.opt.tapToDismiss = true;
        //this.toastr.error(msg, title, this.options);

        this.opt = this.toastr.toastrConfig;
        this.opt.tapToDismiss = true;
        this.opt.positionClass = "toast-top-right";  //"toast-top-center";
        this.opt.closeButton = true;
        this.toastr.error(msg, title, this.opt);
        break;

      case 1:
        this.options.positionClass = "toast-top-right";
        this.toastr.success(msg, title, this.options);
        break;

      case 2:
        this.options.positionClass = "toast-top-right";
        this.toastr.info(msg, title, this.options);
        break;

      case 3:
        this.options.positionClass = "toast-top-right";
        this.toastr.warning(msg, title, this.options);
        break;
      case 4:
        this.opt = this.toastr.toastrConfig;
        this.opt.tapToDismiss = true;
        this.opt.positionClass = "toast-top-center";
        this.opt.closeButton = true;
        this.toastr.error(msg, title, this.opt);
        break;
    }
  }

}
