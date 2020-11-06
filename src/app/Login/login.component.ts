

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetail, User } from 'src/app/Base/BaseClasses';
import { SecurityService } from 'src/app/Providers/SecurityProvider';
import { Title }     from '@angular/platform-browser';


@Component({
    selector: 'login',
    templateUrl: './login.html',
 
})
export class LoginComponent implements OnInit {
    constructor(private router:Router,private security:SecurityService,private titleService: Title) { }
    isForm=false
    isTitleBar=false;
    ErrorMsg = null
    LoginDetail:LoginDetail = new LoginDetail();
    CompanyName:string;
    ngOnInit(): void {

        this.titleService.setTitle("Login Page");

        this.security.loginfillvalues((r)=>{
            if(r.StatusNo)
            {
            this.CompanyName = r.Data;
            }
        })



        if(this.security.getLocalUserData()){

            this.redirectToMenu()
        }


     }



    onLogin(){

        //this.router.navigateByUrl('/admin/home/dashboard')
        this.ErrorMsg = null;
        this.doLogin();
    }

    doLogin(){

        
        
        this.security.mainLogin(this.LoginDetail,(r)=>{


            if(r.StatusNo==0){

                this.ErrorMsg = r.Message;
            }
            else{


                this.redirectToMenu();
               
            }
            
        })
        
    }

    redirectToMenu(){
            this.router.navigate(['Menu'])
        
    }


    

}
