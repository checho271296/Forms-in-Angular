import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noLastName(control: FormControl): {[s:string]:boolean} {
    
    if(control.value?.toLowerCase() === "fonseca"){

      return {
          noLastName: true
        };
    }
    return null;
    
  }
}
