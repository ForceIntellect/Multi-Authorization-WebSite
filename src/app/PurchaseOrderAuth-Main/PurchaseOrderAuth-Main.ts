import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../Providers/HttpProvider';
import { SecurityService } from '../Providers/SecurityProvider';
import { Router } from '@angular/router';
import { DialogProvider } from '../Providers/DialogProvider';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-PurchaseOrderAuth-main',
  templateUrl: './PurchaseOrderAuth-main.html'//,
  //styleUrls: ['./poauthorization-main.component.scss']
})
export class PurchaseOrderAuthMain implements OnInit {

   filter={
     PurchaseOrderNo:null,
     StatusNo:null
   }


  AuthorizationData :any[] = [];
  constructor(public httpService:BaseHttpService,public securityService:SecurityService,public router:Router,
    public dialog :DialogProvider,private titleService: Title) { }

/**
 *  AuthorizationSearchData :any[]= [];
  constructor(httpService:BaseHttpService) {


    let para={LoginNo:1,Where:"1=1"}

     httpService.post('/api/SCOrder/SearchData',para,(response)=>{
 
      console.log(Response);

     })


   }
 */

 FillValues :any ={}


  ngOnInit() {
    this.titleService.setTitle("Purchase Order Authorization Main");
    this.searchAuthorizationData();
   
  }

  loadData(POAmendmentNo){

    this.router.navigate(['PurchaseOrderAuthDetail'],{queryParams:{SCSONo:btoa(POAmendmentNo)}})

  }

  searchAuthorizationData(){

    let Where = ''
    if(this.filter.PurchaseOrderNo){
      Where ="POAM.DocumentNoYearly like  '%"+this.filter.PurchaseOrderNo+"%'"
    }

    if(this.filter.StatusNo){
      if(Where){
        Where+=' And '
      }
      Where+=" POAM.statusNo = "+this.filter.StatusNo
    }

    try{

        
    let LoginNo = this.securityService.LoginNo
    let para={LoginNo:LoginNo,Where:Where}

    // fill values 
    this.httpService.post('/api/PMPO/SearchDataFillValues',{LoginNo:LoginNo},(response)=>{

      this.FillValues = response

      //Search data called after fill values
      this.httpService.post('/api/PMPO/SearchData',para,(response)=>{

        this.AuthorizationData = response.Table
        console.log(response);
   
       })

    })


    }
    catch(es){

        console.error(es);
    }
    

  }

  close(){

    this.securityService.logout();
    //window.close();
  }

  LogOutDialog(){
    this.dialog.openDialog('Logout','Do you want to Logout?','No','Yes',this.close.bind(this))
  }

}
