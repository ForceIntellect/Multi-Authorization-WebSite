import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../Providers/HttpProvider';
import { SecurityService } from '../Providers/SecurityProvider';
import { Router } from '@angular/router';
import { DialogProvider } from '../Providers/DialogProvider';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-poauthorization-main',
  templateUrl: './poauthorization-main.component.html',
  styleUrls: ['./poauthorization-main.component.scss']
})
export class POAuthorizationMainComponent implements OnInit {

   filter={
     SCOrderNo:null,
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
    this.titleService.setTitle("SC Order Authorization Main");

    this.searchAuthorizationData();
   
  }

  loadData(SCSONo){

    this.router.navigate(['POAuthorizationDetail'],{queryParams:{SCSONo:btoa(SCSONo)}})

  }

  searchAuthorizationData(){

    let Where = ''
    if(this.filter.SCOrderNo){
      Where ="SM.DocumentNoYearly like  '%"+this.filter.SCOrderNo+"%'"
    }

    if(this.filter.StatusNo){
      if(Where){
        Where+=' And '
      }
      Where+=" SM.statusNo = "+this.filter.StatusNo
    }

    try{

        
    let LoginNo = this.securityService.LoginNo
    let para={LoginNo:LoginNo,Where:Where}

    // fill values 
    this.httpService.post('/api/SCOrder/SearchDataFillValues',{LoginNo:LoginNo},(response)=>{

      this.FillValues = response

      //Search data called after fill values
      this.httpService.post('/api/SCOrder/SearchData',para,(response)=>{

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
