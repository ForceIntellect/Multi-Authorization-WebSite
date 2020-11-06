import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
 AuthorizationData = [{Name: "Ravish",
                 Addr: "A,Bhilai,Chattisgarh,India",
                 ItemDes: "MS Angle 90 X 90 X 6 MM",
                 NetAmount: 643479.89,
                 RefDocument: "Purchase Request",
                 FreightType: "FOR",
                 Company: "Unit2"},
                 {
                 Name: "Ravish",
                 Addr: "A,Bhilai,Chattisgarh,India",
                 ItemDes: "Grease Tisona M-2,Grease Lithoplex Lcg-2",
                 NetAmount: 322440.00,
                 RefDocument: "Quotation",
                 FreightType: "TOPAY",
                 Company: "Unit2" 
                 },
                 {
                  Name: "ABCD",
                  Addr: "bhilai,Bhilai,Chattisgarh,India",
                  ItemDes: "PIPPETTE 50 ML, CLASS  A",
                  NetAmount: 384.68,
                  RefDocument: "Purchase Request",
                  FreightType: "FOR",
                  Company: "Unit2"
                 } ];
  constructor() { }

  ngOnInit() {
  }

}
