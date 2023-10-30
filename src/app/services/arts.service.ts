import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtsService {
  url = "https://api.artic.edu/api/v1/artworks";
  constructor(private http: HttpClient) { }

  dataload:any
  getAPIData(){
    return this.http.get(this.url)
    // return data
  }
}
