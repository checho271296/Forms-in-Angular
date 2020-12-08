import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  //Referencia a mi formulario

  forma : FormGroup;

  constructor(private formBuilder: FormBuilder, private validatorsService: ValidatorsService) {
    this.createForm();
    // this.loadDataToForm();
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

  get getHobbies(){
      return this.forma.get('hobbies') as FormArray;
  }

  createForm(){

    this.forma = this.formBuilder.group({
      name  : ['',[Validators.required,Validators.minLength(5)]],
      lastname: ['',[Validators.required,Validators.minLength(5),this.validatorsService.noLastName]],
      mail  : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      address: this.formBuilder.group({
        state: ['',Validators.required],
        city: ['',Validators.required]
      }),
      hobbies: this.formBuilder.array([])
    });
  }

  loadDataToForm(){
    this.forma.reset({
      name: "Sergio",
      lastname: "Fonseca",
      mail: "sergio@gmail.com",
      address: {
        state: "San Juan",
        city: "Cartago"
      }
    });

    ['Comer','Dormir'].forEach(valor => this.getHobbies.push(this.formBuilder.control(valor)));
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

  addHobbie(){
    this.getHobbies.push(this.formBuilder.control(''));
  }

  deleteHobbie(index:number){
    this.getHobbies.removeAt(index);
  }

}
