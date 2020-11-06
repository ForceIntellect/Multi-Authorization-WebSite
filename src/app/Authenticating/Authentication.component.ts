import { Component } from "@angular/core";
import { BaseHttpService } from '../Providers/HttpProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../Providers/SecurityProvider';



@Component({

    selector:'Auth-SCOrder',
    template:`

        Please Wait...

    `
})

export class AuthenticationComponent {


    constructor(public routes:ActivatedRoute,public router:Router,public security:SecurityService){

        routes.queryParams.subscribe(d=>{

           
            if(!d.q){

                router.navigateByUrl('../PageNotFound')     

                return;
            }
            


            

            try{

                let decryptedString = atob(d.q)
                              
                let LoginNo = parseInt(decryptedString.split(',')[0].split(':')[1]);
                let Url = decryptedString.split(',')[1].split(':')[1]
             
                this.security.LoginNo = LoginNo
                if (!Url.split('&')[1])
                {
                    router.navigate([Url.split('?')[0]],{queryParams:{SCSONo:Url.split('?')[1].split('=')[1]}});  
                }
                else
                {
                    router.navigate([Url.split('?')[0]],{queryParams:{SCSONo:Url.split('?')[1].split('=')[1].split('&')[0],
                                                         IsRejection: Url.split('&')[1].slice(Url.split('&')[1].indexOf('=') + 1)}});  
                }   
             

            }
            catch(ex){

                router.navigateByUrl('../PageNotFound');
            }




        })
    }



}