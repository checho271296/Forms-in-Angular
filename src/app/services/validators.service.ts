import { Injectable } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noLastName(control: FormControl): ErrorValidate {
    
    if(control.value?.toLowerCase() === "fonseca"){

      return {
          noLastName: true
        };
    }
    return null;
  };

  equalPasswords(pass1Name:string,pass2Name :string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name]; 
      const pass2Control = formGroup.controls[pass2Name]; 

      if( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({notEqual: true});

      }
    }
  };

  userExist(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if(!control.value){
      return Promise.resolve(null);
    }
    return new Promise((resolve,reject)=>{
      setTimeout(() =>{
        if (control.value == 'strider'){
          resolve({exist :true}); //if true user exist
        }else{
          resolve(null);
        }
      },3500);
    });
  };

}
