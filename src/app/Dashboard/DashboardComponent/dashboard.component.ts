import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import {
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
  GridsterPush,
  GridsterItemComponent,
  GridsterComponent,
} from "angular-gridster2";
import { BaseHttpService } from "src/app/Providers/HttpProvider";
import { SecurityService } from "src/app/Providers/SecurityProvider";
import { dashboardCards } from "../dashboard-cards";
import { DashboardOutletDirective } from "../dashboard-outlet.directive";
import { DashboardCardContainer } from "../DashboardCardContainer/Dashboard-card.container";
import * as moment from "moment";
import { DaterangepickerDirective } from "ngx-daterangepicker-material";
import { GridsterDraggable } from "angular-gridster2/lib/gridsterDraggable.service";
import { DBFilterComponent } from "src/app/filterComponent/filter.component";
import { DialogProvider } from "src/app/Providers/DialogProvider";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren(DashboardOutletDirective) dashboardOutlet: QueryList<
    DashboardOutletDirective
  >;

  _blIsTabMode: boolean = true;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth <= 700) {
      this._blIsTabMode = false;
    } else {
      this._blIsTabMode = true;
    }
  }

  @ViewChild("DtpickerRef", { static: false })
  FilterObj: DBFilterComponent;
  DashboardArr: Array<GridsterItem> = [];
  TempDashboardArr: Array<GridsterItem> = [];
  constructor(
    private httpService: BaseHttpService,
    private cd: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    public SecurityService: SecurityService,
    public dialog: DialogProvider
  ) {}

  selectedDate: any = {};
  SelectedDashboardIndx: number = 1;
  SelectedCompany: any = 1;
  ModuleList: any = [];
  options: GridsterConfig = {};
  parameter = {};
  isExpand: boolean = false;
  ngOnInit() {
    this.onDashboardChangeReDrawCards();

    this.options = {
      itemChangeCallback: (
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface
      ) => {},
      itemResizeCallback: (
        item: any,
        itemComponent: GridsterItemComponentInterface
      ) => {
        this.GetSelectedFilters();
        this.ResizeBinding(item);
      },
      disablePushOnDrag: true,
      draggable: {
        enabled: true,
        ignoreContent: true,
        // dropOverItems: true,
        dropOverItems: false,
        dragHandleClass: "drag-handler",
        ignoreContentClass: "no-drag",
      },
      gridType: GridType.ScrollVertical,
      resizable: { enabled: true },
      pushItems: true,
      displayGrid: "onDrag&Resize",
      // displayGrid: "always",
      minCols: 11,
      maxCols: 11,
      minRows: 30,
      maxRows: 50,
      fixedColWidth: 110,
      fixedRowHeight: 75,
      maxItemCols: 50,
      minItemCols: 1,
      maxItemRows: 500,
      minItemRows: 1,
      maxItemArea: 40000,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      setGridSize: true,
      allowMultiLayer: false,
      saveGridItemCalculatedHeightInMobile: true,
      keepFixedHeightInMobile: true,
      pushDirections: { north: true, east: true, south: true, west: true },
      // keepFixedWidthInMobile: true,
    };

    if (document.body.offsetWidth <= 700) {
      this._blIsTabMode = false;
    } else {
      this._blIsTabMode = true;
    }
  }

  ngAfterViewInit() {}

  DeleteFromDashboard(CardNo) {
    this.DashboardArr = this.DashboardArr.filter((e) => e.CardNo !== CardNo);
  }

  GetSelectedFilters() {
    this.selectedDate.startDate = this.FilterObj.FinalObj["FromDate"];
    this.selectedDate.endDate = this.FilterObj.FinalObj["ToDate"];
    this.SelectedCompany = this.FilterObj.FinalObj["CompanyNos"];

    if (this.FilterObj.FinalObj["CompanyNos"]) {
      this.SelectedCompany = this.FilterObj.FinalObj["CompanyNos"];
    } else {
      this.SelectedCompany = 1;
    }
  }

  OnFilterChange(event): any {
    if (this.dashboardOutlet) {
      this.selectedDate.startDate = event["FromDate"];
      this.selectedDate.endDate = event["ToDate"];
      this.SelectedCompany = event["CompanyNos"];
      this.dashboardOutlet.forEach((template) => {
        let value: any = this.dashboardOutlet.filter(
          (e) => e.item.CardNo == template.item.CardNo
        )[0];

        value.componentRef.instance.GetData(
          this.selectedDate,
          template.item.CardNo,
          null,
          null,
          this.SelectedCompany
        );
      });
    }
  }
  loadContents = () => {
    this.cd.detectChanges();
    if (!this.dashboardOutlet || !this.dashboardOutlet.length) {
      return;
    }

    this.dashboardOutlet.forEach((template) => {
      this.loadContent(template, template.item);
    });
    this.cd.detectChanges();
  };

  loadContent = (template: DashboardOutletDirective, item: any) => {
    if (!item.Component) {
      return;
    }

    const viewContainerRef = template.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.cfr.resolveComponentFactory(
      dashboardCards[item.Component]
    );

    const componentRef: any = viewContainerRef.createComponent(
      componentFactory
    );

    template.C = componentRef;

    this.GetSelectedFilters();
    componentRef.instance.GetData(
      this.selectedDate,
      item.CardNo,
      null,
      null,
      this.SelectedCompany,
      item.FeatureOption
    );
    const instance: any = componentRef.instance as DashboardCardContainer;
  };

  ResizeBinding(CardDetail) {
    if (CardDetail.Component === "GraphAndTable") {
      let value: any = this.dashboardOutlet.filter(
        (e) => e.item["CardNo"] == CardDetail.CardNo
      )[0];
      value.componentRef.instance.GetData(
        this.selectedDate,
        CardDetail.CardNo,
        null,
        null,
        this.SelectedCompany,
        CardDetail.FeatureOption
      );
    }
  }

  RefreshCard(CardNo) {
    let value: any = this.dashboardOutlet.filter(
      (e) => e.item["CardNo"] == CardNo
    )[0];
    value.componentRef.instance.isLoading = true;
    value.componentRef.instance.GetData(
      this.selectedDate,
      CardNo,
      null,
      null,
      this.SelectedCompany
    );
  }

  onDashboardChangeReDrawCards(DashboardNo?) {
    let Req = {
      LoginNo: this.SecurityService.LoginNo,
    };
    if (DashboardNo) {
      Req["DashboardNo"] = Number(DashboardNo);
    } else {
      Req["DashboardNo"] = Number(this.SelectedDashboardIndx);
    }
    this.httpService.post("/api/Dashboard/DrawDashboard", Req, (response) => {
      this.DashboardArr = response.Table2;

      localStorage.setItem("FilterCompanies", JSON.stringify(response.Table));
      localStorage.setItem(
        "DefaultFilters",
        JSON.stringify({
          FromDate: this.DashboardArr[0]["FromDate"],
          ToDate: this.DashboardArr[0]["ToDate"],
          CompanyNos: [
            { id: 1, name: "" },
            { id: 2, name: "" },
          ],
        })
      );
      this.ModuleList = response.Table1;

      this.DashboardArr.forEach((element) => {
        if (element["isExpand"] == 1) {
          element["Show"] = false;
        }
      });

      if (this.DashboardArr.length > 0) {
        this.loadContents();
      }
    });
  }
  CardExpandOrCollapse(Card: any) {
    let value: any = this.dashboardOutlet.filter(
      (e) => e.item["CardNo"] == Card.CardNo
    )[0];

    let itemToPush = this.options.api.getItemComponent(Card);

    const push = new GridsterPush(itemToPush);
    if (
      value.componentRef.instance &&
      value.componentRef.instance.ListData &&
      Card["Component"] == "List"
    ) {
      if (
        value.componentRef.instance.ListData.length > 0 &&
        value.componentRef.instance.ListData.length <= 3
      ) {
        itemToPush.$item.rows = 2;
      } else if (
        value.componentRef.instance.ListData.length > 3 &&
        value.componentRef.instance.ListData.length <= 6
      ) {
        itemToPush.$item.rows = 3;
      } else if (
        value.componentRef.instance.ListData.length > 6 &&
        value.componentRef.instance.ListData.length <= 10
      ) {
        itemToPush.$item.rows = 5;
      } else {
        itemToPush.$item.rows =
          value.componentRef.instance.ListData.length / 2 - 1;
      }
    }

    if (
      value.componentRef.instance &&
      value.componentRef.instance.ProgessData &&
      Card["Component"] == "Progress"
    ) {
      if (
        value.componentRef.instance.ProgessData.length > 0 &&
        value.componentRef.instance.ProgessData.length <= 4
      ) {
        itemToPush.$item.rows = 2;
      } else if (
        value.componentRef.instance.ProgessData.length > 4 &&
        value.componentRef.instance.ProgessData.length <= 8
      ) {
        itemToPush.$item.rows = 3;
      } else if (
        value.componentRef.instance.ProgessData.length > 9 &&
        value.componentRef.instance.ProgessData.length <= 10
      ) {
        itemToPush.$item.rows = 4;
      } else {
        itemToPush.$item.rows =
          value.componentRef.instance.ProgessData.length / 2 - 1;
      }
    }

    if (Card["Component"] == "GraphAndTable") {
      itemToPush.$item.rows = 6;
    }

    // itemToPush.$item.rows = 5;

    if (push.pushItems(push.fromNorth)) {
      push.checkPushBack();
      push.setPushedItems();
      itemToPush.setSize();
      itemToPush.checkItemChanges(itemToPush.$item, itemToPush.item);
    } else {
      itemToPush.$item.rows = 3;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy();

    if (!Card["Show"]) {
      this.ReArrangeTheGrid(Card);
    }
  }

  ReArrangeTheGrid(Card: any) {
    Card.rows = 3;

    this.options.compactType = "compactUp";
    this.options.api.optionsChanged();

    this.options.compactType = "none";
    this.options.api.optionsChanged();
  }
  onDeptChangeEvent(index, id) {
    this.SelectedDashboardIndx = 0;
    if (id == 0) {
      this.SelectedDashboardIndx = index;
    }
    if (id == 1) {
      this.SelectedDashboardIndx = index.index + 1;
    }

    this.onDashboardChangeReDrawCards(this.SelectedDashboardIndx);
  }

  GetCardColorForTiles(widget) {
    let result;
    let grad = "linear-gradient(to right,";
    let lightColor = "",
      darkColor = "";

    let colorTochnage = "#fff";
    if (widget.Component == "Tile") {
      darkColor = JSON.parse(widget.FeatureOption)["TileDarkColor"];
      lightColor = JSON.parse(widget.FeatureOption)["TileLightColor"];
      grad = grad + darkColor + "," + lightColor + ")";
    }

    if (widget.Component == "Tile") {
      return grad;
    } else {
      return colorTochnage;
    }
  }

  LogOutDialog() {
    this.dialog.openDialog(
      "Logout",
      "Do you want to Logout?",
      "No",
      "Yes",
      this.close.bind(this)
    );
  }
  close() {
    this.SecurityService.logout();
    //window.close();
  }
  SetCardInfo(id) {}
}
