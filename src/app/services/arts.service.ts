import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtsService {
  url = "https://api.artic.edu/api/v1/artworks/search?";
  constructor(private http: HttpClient) { }


  dataload:any
  getAPIData(searchq: string, page_no: number, page_size: number){
    
    return this.http.get(this.url + "page=" + page_no + "&limit=" + page_size + "&fields=id,title,image_id,alt_image_ids,artist_display,place_of_origin&q=" + searchq)
  }
}
