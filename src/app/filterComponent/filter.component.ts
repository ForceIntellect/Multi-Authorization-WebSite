import { MatDialog, MatDialogRef, MatSelect } from "@angular/material";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import * as moment from "moment";
import { DaterangepickerDirective } from "ngx-daterangepicker-material";

import { DataExchangeService } from "./data-exchange-service";
import { BaseToastService } from '../Services/BaseToast.service';

@Component({
  selector: "dialog_filter",
  templateUrl: "./Dialog/FilterDialog.component.html",
  styleUrls: ["./Dialog/FilterDialog.component.scss"],
})
export class FilterDialogComponent implements OnInit {
  constructor(private DataExchangeService: DataExchangeService,
    private dialogRef:MatDialogRef<FilterDialogComponent>) {
    this.IsModalOpen = true;
  }

  @ViewChild("companySelect", { static: false }) public companySelect: any;


  CloseDropdownPanelMatselect(){
    if(this.selectedCompany && this.selectedCompany.length){
      this.IsModalOpen = true;
    }
    this.companySelect.close();
  }

  IsModalOpen:boolean;

  pickerDirective: DaterangepickerDirective;
  selectedCompanies: any;
  selected: any = {
    startDate: new Date(),
    endDate: new Date(),
  };

  LastFinDate: any = {
    FromDate: "",
    ToDate: "",
  };
  CUrrentFinDate: any = {
    FromDate: null,
    ToDate: null,
  };
  copyCompanyObj:any;
  tempCompany:any;
  commaSeperatedCompany: any = null;
  selectedCompany: any[];
  AllCompanies: any[];
  _dteDates: any = {
    FromDate: null,
    ToDate: null,
  };

  GetCompany(){
    this.tempCompany = this.selectedCompany;
    console.log("temp Cop",this.tempCompany)
  }


  getLastFYYear() {
    let currentDate = new Date();
    var currentyear = currentDate.getFullYear();
    var endFYDate = new Date(currentyear, 2, 31);
    var startFYDate = new Date(currentDate.getFullYear() - 1, 3, 1);

    if (
      currentDate.getTime() < endFYDate.getTime() &&
      currentDate.getTime() > startFYDate.getTime()
    ) {
      var lastYearStartDate = "-04-01";
      lastYearStartDate = currentDate.getFullYear() - 2 + lastYearStartDate;
      var lastYearEndDate = "-03-31";
      lastYearEndDate = currentDate.getFullYear() - 1 + lastYearEndDate;

      this.LastFinDate.FromDate = new Date(lastYearStartDate);
      this.LastFinDate.ToDate = new Date(lastYearEndDate);
    } else if (
      currentDate.getTime() > endFYDate.getTime() &&
      currentDate.getTime() > startFYDate.getTime()
    ) {
      var lastYearStartDate = "-04-01";
      lastYearStartDate = currentDate.getFullYear() - 1 + lastYearStartDate;
      var lastYearEndDate = "-03-31";
      lastYearEndDate = currentDate.getFullYear() + lastYearEndDate;
      this.LastFinDate.FromDate = lastYearStartDate;
      this.LastFinDate.ToDate = lastYearEndDate;
    }
  }

  ranges = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "Last 90 Days": [moment().subtract(89, "days"), moment()],
    "Last 180 Days": [moment().subtract(179, "days"), moment()],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
    "Current Month": [moment().subtract(0, "month").startOf("month"), moment()],
    "Last Fin. Year": [
      moment(moment().year() - 1 + "-04-01"),
      moment(moment().year() + "-03-31"),
    ],
    "Current Fin. Year": [moment(moment().year() + "-04-01"), moment()],
  };

  equals(objOne, objTwo) {
    if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
      return objOne.id === objTwo.id;
    }
  }

  // array is selectedYears
  selectAll(select: MatSelect, values, array) {
    this.commaSeperatedCompany = null;
    select.value = values;
    array = values;

    this.selectedCompany = array;
    this.copyCompanyObj = this.selectedCompany;
    this.selectedCompany.forEach((element) => {
      if (this.commaSeperatedCompany !== null) {
        this.commaSeperatedCompany =
          this.commaSeperatedCompany + "," + element.id;
      } else {
        this.commaSeperatedCompany = element.id;
      }
    });
  }

  deselectAll(select: MatSelect) {
    this.selectedCompany = [];
    this.tempCompany = [];
    this.copyCompanyObj = [];
    select.value = [];
  }

  ngOnInit() {
    this.AllCompanies = JSON.parse(localStorage.getItem("FilterCompanies"));

    this.DataExchangeService.currentData.subscribe((response) => {
      if (response !== null && response !== undefined) {

        this.selected.startDate = response.FromDate;
        this.selected.endDate = response.ToDate;
        // console.log(response, typeof response.CompanyNos);
        if (
          response.CompanyNos !== null &&
          response.CompanyNos !== undefined &&
          typeof response.CompanyNos == "string"
        ) {
          let obj = response.CompanyNos.split(",");
          //console.log(obj, "Company splitted");
          let tempArr = [];
          obj.forEach((element) => {
            let companyName = this.AllCompanies.find(
              (x) => x.id == parseInt(element)
            );
            //console.log(companyName, "ComcompanyName");
            let tempCompany = {
              id: parseInt(element),
              name: companyName,
            };
            tempArr.push(tempCompany);
          });
          this.selectedCompany = tempArr;
          this.copyCompanyObj = tempArr;
        }
        if (typeof response.CompanyNos == "number") {
          let companyName = this.AllCompanies.find(
            (x) => x.id == parseInt(response.CompanyNos)
          );
          this.selectedCompany = [
            { id: response.CompanyNos, name: companyName },
          ];
        }
      }
    });
  }

  CancelDropdownPanelMatselect(event){

    if(this.tempCompany && this.tempCompany.length>0){
      this.selectedCompany = this.tempCompany;
    }
    this.companySelect.close();

  }

  Submit() {
    ////console.log(this.selectedCompany);
    this.commaSeperatedCompany = null;
    if (this.selectedCompany && this.selectedCompany.length) {
      // this.IsModalOpen = true;
      this.IsModalOpen = true;

      this.selectedCompany.forEach((element) => {
        if (this.commaSeperatedCompany !== null) {
          this.commaSeperatedCompany =
            this.commaSeperatedCompany + "," + element.id;
        } else {
          this.commaSeperatedCompany = element.id;
        }
      });

      this.dialogRef.close(true)
    }
    else{
      this.IsModalOpen = false;
    }
  }

  change(event) {
    ////console.log(this.selected);
    this._dteDates.FromDate = this.selected.startDate._d;
    this._dteDates.ToDate = this.selected.endDate._d;
    ////console.log(this._dteDates);
  }
}

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  encapsulation:ViewEncapsulation.None
})
export class DBFilterComponent implements OnInit {
  @ViewChild(FilterDialogComponent, { static: false })
  FilterDialogComponent: FilterDialogComponent;

  FromDate: string;
  ToDate: string;
  constructor(
    private dialog: MatDialog,
    private DataExchangeService: DataExchangeService,
    private Toast:BaseToastService
  ) {}

  FinalObj: any = {
    FromDate: null,
    ToDate: null,
    CompanyNos: "",
  };

  @ViewChild("myButton", { static: false }) public myButtonRef: ElementRef;

  ngOnInit(): void {

    this.FromDate = this.formatDate(new Date());
    this.ToDate = this.formatDate(new Date());
  }
  @Output() EmitObj: EventEmitter<any> = new EventEmitter<any>();

  OpenModal() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: "400px",
      panelClass:"PadddingCls"
    });
    dialogRef.updatePosition({ top: "60px" });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.FromDate = this.formatDate(
          dialogRef.componentInstance.selected.startDate
        );
        this.ToDate = this.formatDate(
          dialogRef.componentInstance.selected.endDate
        );
        if (
          dialogRef.componentInstance.selected.startDate

        ) {



          this.FinalObj = {
            FromDate: dialogRef.componentInstance.selected.startDate,
            ToDate: dialogRef.componentInstance.selected.endDate,
            CompanyNos: dialogRef.componentInstance.commaSeperatedCompany,
          };
        } else {
          this.FromDate = this.formatDate(new Date());
          this.ToDate = this.formatDate(new Date());

          this.FinalObj = {
            FromDate: new Date(),
            ToDate: new Date(),
            CompanyNos: dialogRef.componentInstance.commaSeperatedCompany,
          };
        }

        this.DataExchangeService.ExchangeData(this.FinalObj);
        if(this.FinalObj.CompanyNos){
          this.EmitObj.emit(this.FinalObj);
        }
        else{
          //alert('Select atleast one company')
          //this.Toast.ShowToast(0,"Select atleast one company","Validation")
        }
      }
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  SetCompanyArr(Arr) {
    if (Arr) {
      this.FilterDialogComponent.AllCompanies = Arr;
    } else {
      this.FilterDialogComponent.AllCompanies = [];
    }
  }
}
