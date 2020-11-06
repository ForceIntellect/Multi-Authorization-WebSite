import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material';
import { DialogeComponent } from '../base/DialougeComponent/DialougeComponent';

@Injectable()
export class DialogProvider{

    constructor(public dialog:MatDialog){

    }


    openDialog(Title,Message,nButton,yButton,callback?):void{

        const dilaogRef = this.dialog.open(DialogeComponent,{
           width:"300px",
           data:{ 
                   title:Title,
                   message:Message,
                   noButton :nButton,
                   yesButton: yButton
    
                }
    
        });
    
         dilaogRef.afterClosed().subscribe(result=>{
    
      
          if(result && callback){
    
            callback();
    
          }
    
         })
    
      }
    

}