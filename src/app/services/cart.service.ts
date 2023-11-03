import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IAPIResp } from 'src/interfaces/IAPIResp';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = "https://api.artic.edu/api/v1/artworks/";


  dataload!:IAPIResp;

  /**
   * 
   * @param id unique ID of artworks
   * @returns Observable which streams the API responce with metadata of the artwork
   */
  getArtViewData(id: number){

    return this.http.get(this.url + id + "?fields=id,title,image_id,alt_image_ids,artist_display,place_of_origin,description,thumbnail,Dimensions,medium_display,department_title,publication_history,exhibition_history,credit_line");
  }

  /**
   * 
   * @param id unique ID from favorites Array
   * @returns metadata of artworks from Favorites
   */
  getFavData(id: number){

    return this.http.get(this.url + id + "?fields=id,title,image_id,alt_image_ids,artist_display,place_of_origin,thumbnail");
  }

  cartContent: Array<number>;

  constructor(private http: HttpClient, private auth: AuthService) { 
    
    this.cartContent = []
    let data = localStorage.getItem('art-cart')
    if (data != null){
      let parsedData = JSON.parse(data)
      this.cartContent = parsedData;
    } else {
      localStorage.setItem('art-cart', JSON.stringify(this.cartContent))
    }

  }


  // MOVE TO AUTH SERVICE
  /**
   * 
   * @returns gives the favourites array
   */
  getFavArray(): Array<number> {
    if (!this.auth.isLogIn){
      // alert('useer no log!!')
      return []
    } else {
      return this.auth.userDetails?.favourites!;
    }
  }

  // FIND INDEX IN FAV ARRAY
  /**
   * 
   * @param id unique artwork ID
   * @returns index of artwork in favorites array
   */
  findIdxInFav(id: number): number{
    if (this.auth.isLogIn){
      let idx: number = this.auth.userDetails!.favourites.findIndex((ele: number) => ele == id)
      return idx;
    }
    return -1;
  }

  // USE USERDETAILS INTERFACE TO CHECK
  /**
   * 
   * @param id unique artwork ID
   * @returns whether artwork is in favorites array or not
   */
  checkInFav(id: number): boolean{
    if (!this.auth.isLogIn){
      // alert('User Not log In!!')
      return false
    } else {
      let idx: number = this.findIdxInFav(id);
      if (idx == -1)
        return false;
      else 
        return true;
    }
  }

  // USER USERDETAILS TO CHECK
  /**
   * 
   * @param id unique artworks ID
   * @returns toggle to add/remove from Favorites
   */
  toggleToFav(id : number): boolean{ 

    if (!this.auth.isLogIn){
      alert('User Not Logged In!!!')
      return false;
    } else {
      if (this.checkInFav(id)){
        let idx: number = this.findIdxInFav(id)
        this.auth.userDetails?.favourites.splice(idx, 1)
      } else {
        this.auth.userDetails?.favourites.push(id)
      }
      this.auth.reloadToStorage();
      return true;
    }
  }

  

}
