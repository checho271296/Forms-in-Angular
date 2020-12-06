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
   }

  ngOnInit(): void {
  }

  createForm(){

    this.forma = this.formBuilder.group({
      name  : ['',[Validators.required,Validators.minLength(5)]],
      lastname: ['',[Validators.required,Validators.minLength(5)]],
      mail  : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]]
    });
  }

  save(){
      console.log(this.forma);
  }

}
