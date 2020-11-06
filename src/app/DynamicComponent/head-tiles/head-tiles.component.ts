import { Component, OnInit } from "@angular/core";
import { BaseHttpService } from "src/app/Providers/HttpProvider";
import { SecurityService } from "src/app/Providers/SecurityProvider";

@Component({
  selector: "app-head-tiles",
  templateUrl: "./head-tiles.component.html",
  styleUrls: ["./head-tiles.component.scss"],
})
export class HeadTilesComponent implements OnInit {
  constructor(
    private httpser: BaseHttpService,
    private serSecurity: SecurityService
  ) {}

  ngOnInit() {}

  isLoading: boolean = true;
  Tile: any = [{ Value: "", Caption: "" }];
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
        //console.log("tile", response);
        if (
          response &&
          response.Table.length > 0 &&
          response.Table[0].CardData
        ) {
          this.Tile = JSON.parse(response.Table[0].CardData)[0].Data;
          this.isLoading = false;
          //  console.log(CardNo, this.Tile[0].Caption);
        }

        setTimeout((e) => {
          if (this.isLoading == true) {
            this.isLoading = false;
          }
        }, 5000);
      }
    );
  }
}
