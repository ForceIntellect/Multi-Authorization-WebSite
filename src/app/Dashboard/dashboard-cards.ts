import { GraphAndTableComponent } from "../DynamicComponent/graph-and-table/graph-and-table.component";
import { HeadTilesComponent } from "../DynamicComponent/head-tiles/head-tiles.component";
import { ListComponent } from "../DynamicComponent/list/list.component";
import { ProgressComponent } from "../DynamicComponent/progress/Progress.component";

export const dashboardCards = {
  List: ListComponent,
  Tile: HeadTilesComponent,
  Progress: ProgressComponent,
  GraphAndTable: GraphAndTableComponent,
};
