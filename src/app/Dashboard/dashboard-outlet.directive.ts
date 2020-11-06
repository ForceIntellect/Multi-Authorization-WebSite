import {
  Directive,
  ViewContainerRef,
  Input,
  ComponentRef,
} from "@angular/core";

@Directive({
  selector: "[appDashboardOutlet]",
})
export class DashboardOutletDirective {
  @Input() item;
  componentRef: ComponentRef<unknown>;

  set C(CR: ComponentRef<unknown>) {
    this.componentRef = CR;
  }

  constructor(public viewContainerRef: ViewContainerRef) {}
}
