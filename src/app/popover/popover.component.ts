import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { PopoverModule } from "ngx-smart-popover";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PopoverComponent implements OnInit {
  InnerHTMLContent: string;

  @HostListener("mouseleave", ["$event"])
  handleMousemove(event) {
    // console.log(`xxxxxxxxxxxxx: ${event.clientX}, y: ${event.clientY}`);
    this.dialog.closeAll();
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    // var PopoverTbl = document.getElementById("#ContainerDiv");
  }
}
