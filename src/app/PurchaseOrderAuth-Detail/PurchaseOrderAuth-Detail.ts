import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../Providers/HttpProvider';
import { AuthorizationStatusService } from '../Providers/AuthorizationStatusProvider';
import { SecurityService } from '../Providers/SecurityProvider';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogeComponent } from '../base/DialougeComponent/DialougeComponent';
import { DialogProvider } from '../Providers/DialogProvider';
import { Title }     from '@angular/platform-browser';
import { saveAs } from 'file-saver';



@Component({ 
  selector: 'app-PurchaseOrderAuth-detail',
  templateUrl: './PurchaseOrderAuth-Detail.html'//,
 // styleUrls: ['./poauthorization-detail.component.scss']
})
export class PurchaseOrderAuthDetail implements OnInit {
  

  

AuthorizationDetail :any = {}
ShowTop = false
ShowRejectionPopUp = false;
IsRejection = false;

OpenID=true;
OpenPT=false;
OpenSD=true;
OpenAD=false;
OpenPH=false;
OpenTNC=false;
OpenAC=false;
OpenAS=false;
OpenSRR=false;
OpenTax=false;
OpenAttachment=false;
StatusNo :number;
Comment :string = null;
parameter= { 
             POAmendmentNo: 192,
             LoginNo: 1
           }
 
DownloadParameter = {
                     DocNo: 132,
                     Version: 1
                    }

 units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];                    



  constructor(public BaseHttpService : BaseHttpService,public dialog :DialogProvider,
 public AuthService:AuthorizationStatusService,public SecurityService : SecurityService,
 public routes:ActivatedRoute,public router:Router,private titleService: Title) {

    this.parameter.LoginNo = SecurityService.LoginNo;

    routes.queryParams.subscribe(d=>{

     
      if(!d.SCSONo){
   
          router.navigateByUrl('../PageNotFound')     

          return;
      }

      try{

          let decryptedString = atob(d.SCSONo)
          
          let POAmendmentNo = parseInt(decryptedString);
           
          let Rejection;


          if(!d.IsRejection)
          {
            this.IsRejection = false 
          
          }
          else 
          {
            Rejection = atob(d.IsRejection);
            if(parseInt(Rejection) == 0)
             this.IsRejection = false;
            else 
              this.IsRejection = Boolean(Rejection);
          }
          


          this.parameter.POAmendmentNo = POAmendmentNo;
          this.BaseHttpService.post("api/PMPO/LoadPurchaseOrder",this.parameter,(response)=>{ 
          
            this.AuthorizationDetail = response
            console.log(this.AuthorizationDetail)
          })


      }
      catch(ex){
           alert(ex.Message);
          router.navigateByUrl('../PageNotFound');
      }


  })

}



  


  updateStatus(){

    // this.openDialog();
    // return;


    if(!this.AuthorizationDetail.Table[0].AuthDetailNo){
      return;
    }

    let Work ="Approve"

    if(this.StatusNo == 9 && !this.Comment){
      this.ShowRejectionPopUp = true;
      return;
    }


    if(this.StatusNo == 9){
      Work ="Reject"
    }

    this.ShowRejectionPopUp = false;

    
    this.dialog.openDialog(Work+' Purchase Order','Do you want to '+Work +' Purchase Order ?','No','Yes',this.saveStatus.bind(this))

    

  } 

  refreshPage(){


    window.location.reload();

  }

  saveStatus(){

    this.AuthService.updateStatus(this.StatusNo,this.Comment,this.AuthorizationDetail.Table[0].AuthDetailNo,response=>{


      if(response.StatusNo  == 1){

       this.dialog.openDialog('Success','Purchase Order saved successfully.',' ','Ok',this.refreshPage)

      }
      else{

        this.dialog.openDialog('Error',response.Message,'Cancel','Ok')

      }

   })

   }
   
  scrollToAuthorization(el){

    
    this.OpenAD = true;
    el = document.getElementById(el)
    setTimeout(()=>{

      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    },100)
    


  
  }

  ngOnInit() {
    this.titleService.setTitle("Purchase Order Authorization Detail");

      
  }

  close(){

    this.SecurityService.logout();
    //window.close();
  }

  LogOutDialog(){
    this.dialog.openDialog('Logout','Do you want to Logout?','No','Yes',this.close.bind(this))
  }

  DownLoadFile(DocNo){

     this.DownloadParameter.DocNo = DocNo 
    this.BaseHttpService.post("api/PMPO/DownloadFile",this.DownloadParameter,(response)=>{ 
            
      let DocBlob:Blob = new Blob([new Uint8Array(JSON.parse(response.DocString))], { type: "application/octet-stream" });

      saveAs(DocBlob,response.FileName);
    })
   


  }

  FileSize(bytes: number = 0, precision: number = 2 ) : string {
   
    let unit = 0;

    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }

    return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
  }
}


// added comment by mukul
//Testing comment.
