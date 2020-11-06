import { Component, OnInit } from "@angular/core";
import { BaseHttpService } from "src/app/Providers/HttpProvider";
import { SecurityService } from "src/app/Providers/SecurityProvider";

@Component({
  selector: "app-Progress",
  templateUrl: "./Progress.component.html",
  styleUrls: ["./Progress.component.scss"],
})
export class ProgressComponent implements OnInit {
  constructor(
    private httpser: BaseHttpService,
    private serSecurity: SecurityService
  ) {}

  ngOnInit() {}

  ProgessData: any = [
    // { DName: "ROLLING MILL", POAmt: 22474.28, Perc: 5.78, uniqueId: "1" },
    // {
    //   DName: "POWER PLANT",
    //   POAmt: 13246.46,
    //   Perc: 100.0,
    //   uniqueId: "1",
    // },
    // {
    //   DName: "Galvanising Division",
    //   POAmt: 3192.0,
    //   Perc: 0.03,
    //   uniqueId: "1",
    // },
    // {
    //   DName: "STEEL MELTING SHOP",
    //   POAmt: 588.0,
    //   Perc: 100.0,
    //   uniqueId: "1",
    // },
    // { DName: "ABCD", POAmt: 22474.28, Perc: 5.78, uniqueId: "2" },
    // {
    //   DName: 2,
    //   POAmt: 13246.46,
    //   Perc: 100.0,
    //   uniqueId: "2",
    // },
    // {
    //   uniqueId: "2",
    //   DName: "MELTING",
    //   POAmt: 3192.0,
    //   Perc: 0.03,
    // },
    // {
    //   uniqueId: "1",
    //   DName: "Division ",
    //   POAmt: 588.0,
    //   Perc: 100.0,
    // },
  ];
  Data: any = [];
  TileData: any = [];
  Graph: any = [];
  ActionBtn: number = 1;
  FeatureToShow: any = {
    DropDown: false,
    Graph: false,
    Table: false,
    ActionBtn: false,
  };
  isLoading: boolean = true;
  type = "";
  Chartdata = [
    // ["2013", 1000, 400],
    // ["2014", 1170, 460],
    // ["2015", 660, 1120],
    // ["2016", 1030, 540],
  ];
  columnNames = ["Year", "Sales", "Expenses"];
  options = {
    width: "auto",
    heigth: "auto",
  };

  TORF: any = {
    Show: true,
  };
  ShowChart(Show) {
    //console.log(Show);
    this.TORF.Show = !Show;
  }
  public GetData(
    selectedDate,
    CardNo,
    ActiveBtnVal?,
    SelectedDrpDwn?,
    CompanyNo?,
    FeatureOption?
  ) {
    //  console.log(CardNo);
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
        //console.log("progreess", response);
        if (response && response.Table.length > 0) {
          // let uniqueId = null;

          this.ProgessData = JSON.parse(response.Table[0].CardData)[0].Data;

          this.ProgessData.forEach((element) => {
            element["Show"] = true;
          });

          this.Data = [];
          this.ProgessData.forEach((element) => {
            this.Data.push(element);
          });
          this.isLoading = false;

          // this.TileData = [
          //   { Caption: "A", Value: 1 },
          //   { Caption: "B", Value: 2 },
          // ];
        }
        setTimeout((e) => {
          if (this.isLoading == true) {
            this.isLoading = false;
          }
        }, 5000);
      },
      (error) => {}
    );
  }

  OnChangeofTile(Value) {
    this.Data = [];
    this.ProgessData.forEach((element) => {
      if (element.uniqueId == Value) {
        this.Data.push(element);
      }
    });
    this.ActionBtn = Value;
  }

  isNumber(val): boolean {
    return Number(val) != NaN && typeof val === "number";
  }
}
