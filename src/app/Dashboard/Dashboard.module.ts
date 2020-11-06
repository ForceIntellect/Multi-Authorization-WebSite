import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardOutletDirective } from "./dashboard-outlet.directive";
import { HttpClientModule } from "@angular/common/http";
import { DashboardCardContainer } from "./DashboardCardContainer/Dashboard-card.container";
import { DashboardComponent } from "./DashboardComponent/dashboard.component";
import { RouterModule } from "@angular/router";
import { GridsterModule } from "angular-gridster2";
import {
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSpinner,
  MatTabsModule,
  MatToolbarModule,
} from "@angular/material";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { FormsModule } from "@angular/forms";
import { DataExchangeService } from "../filterComponent/data-exchange-service";
import { DBFilterComponent } from "../filterComponent/filter.component";
import { BaseToastService } from '../Services/BaseToast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    DashboardComponent,
    DBFilterComponent,
    DashboardOutletDirective,
    DashboardCardContainer,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    GridsterModule,
    MatIconModule,
    NgxDaterangepickerMd,
    FormsModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,

  ],
  exports: [DashboardComponent],
  providers: [DataExchangeService,],
  entryComponents: [
    // ChartContainer,
    // TableContainer,
    // HeadTilesContainer,
    // ListContainer,
  ],
})
export class DashboardModule {}
