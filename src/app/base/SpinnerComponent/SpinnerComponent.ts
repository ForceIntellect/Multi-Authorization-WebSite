import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({ 

    selector:'mat-spinner',
    templateUrl:'SpinnerComponent.html'
}) 

export class SpinnerComponent{


    constructor(
        public dialogRef: MatDialogRef<SpinnerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

          if(!data.noButton){
            data.noButton ="No"
          }

          if(!data.yesButton){
            data.yesButton ="Yes"
          }

        }
    
      onNoClick(): void {
        this.dialogRef.close();
      }

}