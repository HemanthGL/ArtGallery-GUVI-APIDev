import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { IAPIResp } from 'src/interfaces/IAPIResp';

@Injectable({
  providedIn: 'root'
})
export class ArtsService {
  url = "https://api.artic.edu/api/v1/artworks/search?";
  constructor(private http: HttpClient) { }


  dataload!:IAPIResp
  /**
   * 
   * @param searchq search query from search bar
   * @param page_no page Number in paginator response for search query response
   * @param page_size page size of paginated API response
   * @returns Observable which streams Artworks data when received from API
   */
  getAPIData(searchq: string, page_no: number, page_size: number){
    
    return this.http.get(this.url + "page=" + page_no + "&limit=" + page_size + "&fields=id,title,image_id,alt_image_ids,artist_display,place_of_origin,thumbnail&q=" + searchq)
  }
}
