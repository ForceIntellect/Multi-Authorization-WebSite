import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../Providers/HttpProvider';
import { AuthorizationStatusService } from '../Providers/AuthorizationStatusProvider';
import { SecurityService } from '../Providers/SecurityProvider';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogeComponent } from '../base/DialougeComponent/DialougeComponent';
import { DialogProvider } from '../Providers/DialogProvider';
import { Title }     from '@angular/platform-browser';


@Component({ 
  selector: 'app-poauthorization-detail',
  templateUrl: './poauthorization-detail.component.html',
  styleUrls: ['./poauthorization-detail.component.scss']
})
export class POAuthorizationDetailComponent implements OnInit {
  

  

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
StatusNo :number;
Comment :string = null;
parameter= { 
             SCOrderAmendmentNo: 192,
             LoginNo: 1
           }

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
          
          let SCSONo = parseInt(decryptedString);
           
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
          


          this.parameter.SCOrderAmendmentNo = SCSONo;
          this.BaseHttpService.post("api/SCOrder/LoadSCOrder",this.parameter,(response)=>{ 
          
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

    
    this.dialog.openDialog(Work+' SC Order','Do you want to '+Work +' SC Order ?','No','Yes',this.saveStatus.bind(this))

    

  } 

  refreshPage(){


    window.location.reload();

  }

  saveStatus(){

    this.AuthService.updateStatus(this.StatusNo,this.Comment,this.AuthorizationDetail.Table[0].AuthDetailNo,response=>{


      if(response.StatusNo  == 1){

       this.dialog.openDialog('Success','SC Order saved successfully.',' ','Ok',this.refreshPage)

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
    this.titleService.setTitle("SC Order Authorization Detail");
  }

  close(){

    this.SecurityService.logout();
    //window.close();
  }

  LogOutDialog(){
    this.dialog.openDialog('Logout','Do you want to Logout?','No','Yes',this.close.bind(this))
  }
}


// added comment by mukul
//Testing comment.
