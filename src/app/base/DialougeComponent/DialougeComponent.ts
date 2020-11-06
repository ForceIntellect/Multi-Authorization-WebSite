import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({ 

    selector:'mat-dialoge',
    templateUrl:'DialougeComponent.html'
}) 

export class DialogeComponent{


    constructor(
        public dialogRef: MatDialogRef<DialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {


        }
    
      onNoClick(): void {
        this.dialogRef.close();
      }

}