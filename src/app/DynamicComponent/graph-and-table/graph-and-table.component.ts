import { Component, OnInit } from "@angular/core";
import { BaseHttpService } from "src/app/Providers/HttpProvider";
import { SecurityService } from "src/app/Providers/SecurityProvider";

@Component({
  selector: "app-graph-and-table",
  templateUrl: "./graph-and-table.component.html",
  styleUrls: ["./graph-and-table.component.scss"],
})
export class GraphAndTableComponent implements OnInit {
  constructor(
    private httpser: BaseHttpService,
    private serSecurity: SecurityService
  ) {}

  ngOnInit() {}
  leftCurtain: boolean = false;
  title = "";
  type = null;
  GraphData: any = [];
  columnNames = ["Year", "Sales", "Expenses"];
  options = {
    width: "auto",
    heigth: "auto",
  };
  ActiveBtnNo: any = "V";
  SelectedDrpDwn: any = 1;
  TableData: any = [];
  TableHead: any = [];
  ActionBtnData = [];
  ProcessData: any = [];
  FeatureToShow: any = {};
  DropDownData: any = [];
  isLoading: boolean = true;
  NumericCaptionArr: any = [];

  public GetData(
    selectedDate,
    CardNo,
    ActiveBtnVal?,
    SelectedDrpDwn?,
    CompanyNo?,
    FeatureOption?
  ) {
    if (FeatureOption) {
      this.FeatureToShow = JSON.parse(FeatureOption);
      this.ActionBtnData = this.FeatureToShow["ActionBtnData"];
      this.DropDownData = this.FeatureToShow["DropDownData"];
    }
    // console.log(selectedDate, "Selected Date Graph and table");

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
        //  console.log("gT", response);
        if (
          response &&
          response.Table.length > 0 &&
          response.Table[0].CardData
        ) {
          this.isLoading = false;
          let uniqueid = null;
          if (this.FeatureToShow.ActionBtn) {
            //uniqueid = ActiveBtnVal;
            uniqueid = this.ActiveBtnNo;
          }
          if (this.FeatureToShow.DropDown) {
            uniqueid = SelectedDrpDwn;
          }
          if (this.FeatureToShow.ActionBtn && this.FeatureToShow.DropDown) {
            uniqueid = this.ActiveBtnNo + "_" + this.SelectedDrpDwn;
          }

          this.ProcessData = JSON.parse(response.Table[0].CardData);

          if (this.ProcessData) {
            if (this.FeatureToShow.Graph && this.FeatureToShow.Table) {
              //console.log(this.ProcessData);
              this.columnNames = this.ProcessData[0]["colname"];

              this.options = this.ProcessData[0]["options"];
              this.options["animation"] = {
                easing: "inAndOut",
                startup: true,
                duration: 500,
              };
              this.options["chartArea"] = {
                left: 80,
                top: 15,
                right: 0,
                width: "85%",
                height: "70%",
              };

              if (this.type) {
                this.ProcessData[0]["options"]["type"] = this.type;
              }
              this.type = this.ProcessData[0]["options"]["type"];

              if (this.type == "PieChart") {
                this.options["chartArea"]["left"] = 20;
              }

              delete this.ProcessData[0]["options"]["type"];

              this.GraphData = this.ProcessData[0]["Data"];

              this.TableData = this.ProcessData[2]["Data"];

              if (this.ProcessData[2]["NumericCaptionArr"]) {
                this.NumericCaptionArr = this.ProcessData[2][
                  "NumericCaptionArr"
                ];
              }
              this.TableHead = Object.keys(this.TableData[0]);
            } else {
              this.ProcessData.forEach((element) => {
                if (
                  (this.FeatureToShow.ActionBtn &&
                    element.uniqueid == uniqueid) ||
                  element.Data.length > 0
                ) {
                  this.GraphData = [];
                  this.columnNames = element["colname"];

                  this.options = element["options"];
                  this.options["animation"] = {
                    easing: "inAndOut",
                    startup: true,
                    duration: 500,
                  };
                  this.options["chartArea"] = {
                    left: 80,
                    top: 15,
                    right: 0,
                    width: "85%",
                    height: "70%",
                  };

                  if (this.type) {
                    element["options"]["type"] = this.type;
                  }
                  this.type = element["options"]["type"];
                  delete element["options"]["type"];

                  if (this.type == "PieChart") {
                    this.options["chartArea"]["left"] = 20;
                  }

                  if (this.FeatureToShow.Graph && !this.FeatureToShow.Table) {
                    this.GraphData = [element["Data"]];
                    this.GraphData = this.GraphData[0];
                  }

                  if (this.FeatureToShow.Table && !this.FeatureToShow.Graph) {
                    this.TableData = element["Data"];
                    this.TableHead = Object.keys(this.TableData[0]);

                    if (element["NumericCaptionArr"]) {
                      this.NumericCaptionArr = element["NumericCaptionArr"];
                    }
                  }
                }
              });
            }
          }
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
  ChangeInTile(ActiveBtnVal, Month) {
    this.ActiveBtnNo = ActiveBtnVal;
    this.SelectedDrpDwn = Month;
    let uniqueid = null;
    if (this.FeatureToShow.ActionBtn) {
      uniqueid = ["0", ActiveBtnVal];
    }
    if (this.FeatureToShow.Month) {
      uniqueid = ["0", Month];
    }
    if (this.FeatureToShow.ActionBtn && this.FeatureToShow.DropDown) {
      uniqueid = [this.ActiveBtnNo, this.SelectedDrpDwn];
    }

    this.ProcessData.forEach((element) => {
      let temparr = element.uniqueid.split("_");

      if (temparr[0] == uniqueid[0] && temparr[1] == uniqueid[1]) {
        if (temparr[2] == "G") {
          this.GraphData = [];
          this.columnNames = [];

          this.columnNames = element["colname"];
          this.options = element["options"];

          this.options["chartArea"] = {
            left: 80,
            top: 15,
            right: 0,
            width: "85%",
            height: "70%",
          };

          this.options["animation"] = {
            easing: "inAndOut",
            startup: true,
            duration: 500,
          };
          element["options"]["type"] = this.type;
          this.type = element["options"]["type"];
          delete element["options"]["type"];

          if (this.type == "PieChart") {
            this.options["chartArea"]["left"] = 20;
          }

          this.GraphData = element["Data"];
        }
        if (temparr[2] == "T") {
          this.TableData = element["Data"];
          this.TableHead = Object.keys(this.TableData[0]);
          if (element["NumericCaptionArr"]) {
            this.NumericCaptionArr = element["NumericCaptionArr"];
          }
        }
      }
    });
  }
}
