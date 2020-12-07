import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  //Referencia a mi formulario

  forma : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.loadDataToForm();
   }

  ngOnInit(): void {
  }

  get noValidName():Boolean{
    return this.forma.get('name').invalid &&  this.forma.get('name').touched;
  }

  get noValidLastname():Boolean{
    return this.forma.get('lastname').invalid &&  this.forma.get('lastname').touched;
  }

  get noValidMail():Boolean{
    return this.forma.get('mail').invalid &&  this.forma.get('mail').touched;
  }

  get noValidState():Boolean{
    return this.forma.get('address.state').invalid &&  this.forma.get('address.state').touched;
  }

  get noValidCity():Boolean{
    return this.forma.get('address.city').invalid &&  this.forma.get('address.city').touched;
  }

  get validName():Boolean{
    return this.forma.get('name').valid; 
  }

  get validLastname():Boolean{
    return this.forma.get('lastname').valid;
  }

  get validMail():Boolean{
    return this.forma.get('mail').valid ;
  }
  get validState():Boolean{
    return this.forma.get('address.state').valid ;
  }
  get validCity():Boolean{
    return this.forma.get('address.city').valid ;
  }

  createForm(){

    this.forma = this.formBuilder.group({
      name  : ['',[Validators.required,Validators.minLength(5)]],
      lastname: ['',[Validators.required,Validators.minLength(5)]],
      mail  : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      address: this.formBuilder.group({
        state: ['',Validators.required],
        city: ['',Validators.required]
      })
    });
  }

  loadDataToForm(){
    this.forma.setValue({
      name: "Sergio",
      lastname: "Fonseca",
      mail: "sergio@gmail.com",
      address: {
        state: "San Juan",
        city: "Cartago"
      }
    });
  }

  save(){
    if(this.forma.valid){
      console.log(this.forma.value);
    }else{
      Object.values(this.forma.controls).forEach(control =>{
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(subControl =>{
            subControl.markAsTouched();
          });
          };
        control.markAsTouched();
      });
    };

    this.forma.reset();
  }

}
