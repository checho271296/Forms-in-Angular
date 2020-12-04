import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario ={
    nombre : "Sergio",
    apellido: "Fonseca",
    correo: "serigo@armando.com",
    pais: "",
    genero: "M"
  }

  paises : any[] = [];
  
  constructor(private paisService: PaisService) { }

  

  ngOnInit(): void {
    
    this.paisService.getPaises()
      .subscribe(data =>{
        this.paises  = data;
        this.paises.unshift({nombre: 'Seleccione un pais', codigo: ''});
      })
  }

  

  guardar(forma :NgForm){
    if(forma.valid){
      console.log(forma.value);
    }else{
      Object.values(forma.controls).forEach(control =>{
        control.markAsTouched();
      })
    }
    
  }
}
