import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url = 'https://restcountries.eu/rest/v2/lang/es';
  constructor(private httpClient: HttpClient) { }


  getPaises(){
    return this.httpClient.get(this.url)
    .pipe(
      map((resp:any[]) => resp.map(pais => ({nombre: pais.name,codigo: pais.alpha3Code})))
    );
  }
}
