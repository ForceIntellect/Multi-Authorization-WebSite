import { Component } from "@angular/core";
import { DashboardCardContainer } from "src/app/Dashboard/DashboardCardContainer/Dashboard-card.container";

@Component({
  template: `<app-graph-and-table></app-graph-and-table>`,
})
export class GraphAndTableContainer extends DashboardCardContainer {}
