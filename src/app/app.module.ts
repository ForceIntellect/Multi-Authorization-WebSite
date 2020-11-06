import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { TestComponentComponent } from "./test-component/test-component.component";
import { POAuthorizationDetailComponent } from "./poauthorization-detail/poauthorization-detail.component";
import { POAuthorizationMainComponent } from "./poauthorization-main/poauthorization-main.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BaseHttpService } from "./Providers/HttpProvider";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SecurityService } from "./Providers/SecurityProvider";
import { AuthorizationStatusService } from "./Providers/AuthorizationStatusProvider";
import { AuthenticationComponent } from "./Authenticating/Authentication.component";
import {
  MatDialogModule,
  MatButtonModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatProgressSpinner,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatIconModule,
  MatDividerModule,
  MatSelectModule,
  MatListModule,
  MatTooltipModule,
} from "@angular/material";
import { DialogeComponent } from "./base/DialougeComponent/DialougeComponent";
import { DialogProvider } from "./Providers/DialogProvider";
import { SpinnerComponent } from "./base/SpinnerComponent/SpinnerComponent";
import { SpinnerProvider } from "./Providers/spinnerProvider";
import { LogoutComponent } from "./LogoutComponent/Logout.component";
import { LoginComponent } from "./Login/login.component";
import { PurchaseOrderAuthMain } from "./PurchaseOrderAuth-Main/PurchaseOrderAuth-Main";
import { PurchaseOrderAuthDetail } from "./PurchaseOrderAuth-Detail/PurchaseOrderAuth-Detail";
import { MenuComponent } from "./Menu/Menu";
import { Title } from "@angular/platform-browser";
import { DashboardModule } from "./Dashboard/Dashboard.module";
import { DashboardComponent } from "./Dashboard/DashboardComponent/dashboard.component";
import {
  GoogleChartComponent,
  GoogleChartsModule,
  ScriptLoaderService,
} from "angular-google-charts";
import { HeadTilesComponent } from "./DynamicComponent/head-tiles/head-tiles.component";
import { HeadTilesContainer } from "./DynamicComponent/head-tiles/head-tiles.container";
import { ListComponent } from "./DynamicComponent/list/list.component";
import { ListContainer } from "./DynamicComponent/list/list.container";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ProgressComponent } from "./DynamicComponent/progress/Progress.component";
import { ProgessContainer } from "./DynamicComponent/progress/Progress.container";
import { GraphAndTableComponent } from "./DynamicComponent/graph-and-table/graph-and-table.component";
import { GraphAndTableContainer } from "./DynamicComponent/graph-and-table/graph-and-table.container";
import { FilterDialogComponent } from "./filterComponent/filter.component";
import { BaseToastService } from './Services/BaseToast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverModule } from 'ngx-smart-popover'
import { PopoverComponent } from './popover/popover.component';


const appRoutes: Routes = [
  { path: "SCSOAuthorizationMain", component: POAuthorizationMainComponent },
  { path: "POAuthorizationDetail", component: POAuthorizationDetailComponent },
  { path: "PMPOAuthorizationMain", component: PurchaseOrderAuthMain },
  { path: "PurchaseOrderAuthDetail", component: PurchaseOrderAuthDetail },
  { path: "Authentication", component: AuthenticationComponent },
  { path: "PageNotFound", component: PageNotFoundComponent },
  { path: "Logout", component: LogoutComponent },
  { path: "Login", component: LoginComponent },
  { path: "Menu", component: MenuComponent },
  { path: "Dashboard", component: DashboardComponent },
  // { path: "filter", component: DBFilterComponent },
  { path: "", redirectTo: "/Login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

const appInitializerFn = (appConfig: BaseHttpService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    POAuthorizationDetailComponent,
    POAuthorizationMainComponent,
    PageNotFoundComponent,
    AuthenticationComponent,
    DialogeComponent,
    SpinnerComponent,
    LogoutComponent,
    LoginComponent,
    PurchaseOrderAuthMain,
    PurchaseOrderAuthDetail,
    MenuComponent,
    HeadTilesComponent,
    HeadTilesContainer,
    ListComponent,
    ListContainer,
    ProgessContainer,
    ProgressComponent,
    GraphAndTableComponent,
    GraphAndTableContainer,
    FilterDialogComponent,
    PopoverComponent
    // DBFilterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    GoogleChartsModule,
    DashboardModule,
    NgxDaterangepickerMd.forRoot(),
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    PopoverModule,

  ],
  providers: [
    BaseHttpService,
    SecurityService,
    AuthorizationStatusService,
    DialogProvider,
    SpinnerProvider,
    ScriptLoaderService,
    BaseToastService,
    ToastrService,
    Title,

    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [BaseHttpService],
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogeComponent,
    SpinnerComponent,
    ListContainer,
    HeadTilesContainer,
    HeadTilesComponent,
    ListComponent,
    ProgessContainer,
    ProgressComponent,
    GraphAndTableContainer,
    GraphAndTableComponent,
    FilterDialogComponent,
    PopoverComponent,
  ],
})
export class AppModule {}
