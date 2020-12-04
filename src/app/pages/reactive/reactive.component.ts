import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      name  : ['',],
      lastname: ['',],
      mail  : ['',]
    });
  }

  save(){
      console.log(this.forma);
  }

}
