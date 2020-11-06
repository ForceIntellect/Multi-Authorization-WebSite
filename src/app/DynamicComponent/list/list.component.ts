import { Component, OnInit, SecurityContext } from "@angular/core";
import { BaseHttpService } from "src/app/Providers/HttpProvider";
import { SecurityService } from "src/app/Providers/SecurityProvider";
import { MatDialog } from "@angular/material";
import { PopoverComponent } from "src/app/popover/popover.component";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(
    private httpser: BaseHttpService,
    private serSecurity: SecurityService,
    public dialog: MatDialog,
    private dom: DomSanitizer
  ) {}
  ngOnInit() {
    this.DivId = Math.random();
  }

  ListData: any = [];
  DivId: number;
  Tilecolor: any = "#71a19e";
  Show: any = false;
  isLoading: boolean = true;
  //To show popover
  _blShowpopover: boolean = false;
  scope: any = [];

  CreateItemTemplate(d, event?, getElement?) {
    // console.log(d, "Value of d");
    // console.log(event, "Event ");
    // console.log(getElement, "Get element");
    let keys: any = [];
    let strExtras: string = "";
    if (d) {
      var PopoverTbl = document.getElementById(String(getElement));
      var rect = event.target.closest(".topTenCls").getBoundingClientRect();
      // console.log("From list component 1", d);
      keys = Object.keys(d.PopOverData);
    }
    this.scope.tooltip = "";
    if (PopoverTbl && d) {
      this.scope.tooltip =
        "  <div style='font-size: 14px;padding: 8px 4px 4px 4px;" +
        "color: #404040 !important;" +
        " border-radius: 0px;" +
        " text-align:center;" +
        "background-color: #fff;" +
        "font-weight:600;border-bottom:2px solid #dfdfdf;margin: 0px 20px;'>" +
        "  <i class='fa fa-list' aria-hidden='true'></i> Detail" +
        "</div>" +
        "<div style=\"padding:8px 14px 14px 21px;font-family:'Roboto',san-serif\">" +
        '     <table id="table-responsive" style="">' +
        "   <tr>" +
        '<td colspan="2" style ="font-weight: bold;color: #e6752a;' +
        'border-top:none;padding:0px !important;">' +
        d["Title"] +
        "</td>" +
        "</tr>";
      for (let itm of keys) {
        strExtras =
          strExtras +
          " <tr>" +
          '     <td width="100" class="popOverLable" style="padding: 0px !important;font-size:12px;' +
          'border-top:none;  vertical-align: top;color: black;font-weight: 600"> ' +
          itm +
          " </td>" +
          '<td style="padding: 0px !important;font-size:12px; border-top:none;"> : ' +
          d.PopOverData[itm] +
          "</td>" +
          "   </tr>";
      }

      this.scope.tooltip = this.scope.tooltip + strExtras;
      document.getElementById(getElement).style.display = "block";
      PopoverTbl.style.position = "absolute";

      if (Math.round((event["clientX"] / window.innerWidth) * 100) > 70) {
        PopoverTbl.style.left = 50 + "px";
      }
      PopoverTbl.style.top = event["clientY"] - rect.top + "px";
      PopoverTbl.innerHTML = this.scope.tooltip;
    } else {
      document.getElementById(getElement).style.display = "none";
    }
  }

  public GetData(
    selectedDate,
    CardNo,
    ActiveBtnVal?,
    SelectedDrpDwn?,
    CompanyNo?,
    FeatureOption?
  ) {
    this.httpser.post(
      "/api/Dashboard/GetDataForTopNItem",
      {
        LoginNo: this.serSecurity.LoginNo,
        CompanyNos: String(CompanyNo),
        FromDate: this.httpser.ConvertToYYYYMMDDFormat(selectedDate.startDate),
        ToDate: this.httpser.ConvertToYYYYMMDDFormat(selectedDate.endDate),
        CardNo: CardNo,
      },
      (response) => {
        //console.log("list", response);
        if (
          response &&
          response.Table.length > 0 &&
          response.Table[0].CardData
        ) {
          // if (CardNo == 33) {
          //   console.log("list", response.Table[0].CardData);
          // }
          this.ListData = JSON.parse(response.Table[0].CardData)[0].Data;
          this.isLoading = false;
        }
        // console.log(FeatureOption, "list");
        setTimeout((e) => {
          if (this.isLoading == true) {
            this.isLoading = false;
          }
        }, 5000);
        if (FeatureOption) {
          this.Tilecolor = JSON.parse(FeatureOption)["TileColor"];
        }
      },
      (error) => {
        //  console.log("Error", error);
      }
    );
  }
  MakeitHighlighted(d) {
    let strArr = ["", "", "#fff"];
    if (typeof d["Highlighter"] != "undefined") {
      strArr = d["Highlighter"].split("_");
    }

    return strArr[2];
  }

  CallPopOver(d, event?, getElement?) {
    let LeftPos = null;
    var PopoverTbl = document.getElementById(String(getElement));
    var rect = event.target.closest(".topTenCls").getBoundingClientRect();
    let keys: any = [];
    let strExtras: string = "";
    let StringTemplate = "";
    keys = Object.keys(d.PopOverData);
    if (d) {
      StringTemplate =
        "  <div class = 'OuterDiv'>" +
        "   Detail" +
        "</div>" +
        "<div class = 'SecondDiv'>" +
        '     <table id="table-responsive">' +
        "<tr>" +
        '<td colspan="2" class = "firstTD">' +
        d["Title"] +
        "</td>" +
        "</tr>";
      for (let itm of keys) {
        strExtras =
          strExtras +
          " <tr>" +
          '     <td class="popOverLable SecondTD" > ' +
          itm +
          " </td>" +
          '<td class = "ThirdTD"> : ' +
          d.PopOverData[itm] +
          "</td>" +
          "</tr>";
      }

      StringTemplate = StringTemplate + strExtras + "</div>";
    }

    if (Math.round((event["clientX"] / window.innerWidth) * 100) > 70) {
      PopoverTbl.style.left = 50 + "px";
      LeftPos = 50 + "px";
    }

    const dialogRef = this.dialog.open(PopoverComponent, {
      disableClose: true,
      backdropClass: "backdropModalCls",
      panelClass: "DialogPannelClas",
    });

    dialogRef.componentInstance.InnerHTMLContent = this.dom.sanitize(
      SecurityContext.HTML,
      StringTemplate
    );

    let obj = {};

    if (Math.round((event["clientX"] / window.innerWidth) * 100) > 85) {
      obj = {
        top: event["clientY"] + "px",
        right: "50px",
      };
    } else {
      obj = {
        top: event["clientY"] + "px",
        left: event["clientX"] + "px",
      };
    }

    dialogRef.updatePosition(obj);
  }
  DismissPopOver() {}
}
