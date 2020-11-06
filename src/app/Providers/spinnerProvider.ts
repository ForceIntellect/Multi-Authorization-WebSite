import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material';

import { SpinnerComponent } from '../base/SpinnerComponent/SpinnerComponent';

@Injectable()
export class SpinnerProvider{

    constructor(public dialog:MatDialog){

    }
     dilaogRef:any

    public openDialog():void{

        this.dilaogRef = this.dialog.open(SpinnerComponent,{
           width:"100%",
           height:'100vh',
           data:{}
    
        });
    
        
    
      }
    
      public close():void{

        this.dialog.closeAll();
      }

}