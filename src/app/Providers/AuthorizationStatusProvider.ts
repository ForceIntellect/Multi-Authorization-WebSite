import { Injectable } from "@angular/core";
import { BaseHttpService } from './HttpProvider';
import { SecurityService } from './SecurityProvider';
import {StatusNos,Response} from '../base/GlobalData'


@Injectable()
export class AuthorizationStatusService{

 

    constructor(public httpService:BaseHttpService,public security :SecurityService){}

     
    updateStatus(StatusNo,Comment,AuthDetailNo,Callback){


        if(StatusNo == StatusNos.Reject && !Comment ){

            Response.StatusNo = 0;
            Response.Message = "Please Enter comment."
            
            Callback(Response);    
        }
        else{

            let para ={

                StatusNo :StatusNo,
                Comment :Comment,
                AuthDetailNo :AuthDetailNo,
                StatusChangeByLoginNo :this.security.LoginNo  

            }

            this.httpService.post("/api/SCOrder/UpdateStatus",para,(res)=>{

                // alert(JSON.stringify(response))
                // Response.StatusNo = response.StatusNo
                // Response.Message = response.Message

                Callback(res);


            },true)
            
        }


    }


}