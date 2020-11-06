

export class Response_Type{

    StatusNo:number;
    Message:string;
    Data:any={}
}

export class User{

    UserName:string = null;
    UserID:string=null;
    Password:string=null;
    LoginNo:number = null;
    CompanyNo:number = null;
    YearNo:number = null;
    PrintingName:string= null;
    IsVendorLogin:boolean=false;

    constructor(salesOrder?:User){

      
        
        if(salesOrder)
          for(let p in this as User){
    
            if(salesOrder[p]){
                
                this[p] = salesOrder[p]
            }
              
          }
    
        //return s;
     } 
   


}

export class LoginDetail{

  LoginName:string = null;
  Pwd:string = null;
  /*IPAddress:string = null
  GUID:string = null
  Port:number = null
  OS:string = null
  Browser:string = null
  Device:string = null
  LoginGUID:string = null */
  
}