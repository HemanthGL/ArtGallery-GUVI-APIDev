import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = "https://api.artic.edu/api/v1/artworks/";


  dataload:any

  getArtViewData(id: number){

    return this.http.get(this.url + id + "?fields=id,title,image_id,alt_image_ids,artist_display,place_of_origin,description");
  }

  getFavData(id: number){

    return this.http.get(this.url + id + "?fields=id,title,image_id,alt_image_ids,artist_display,place_of_origin");
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
  getFavArray(): Array<number> {
    if (!this.auth.isLogIn){
      // alert('useer no log!!')
      return []
    } else {
      return this.auth.userDetails?.favourites!;
    }
  }

  // FIND INDEX IN FAV ARRAY
  findIdxInFav(id: number): number{
    if (this.auth.isLogIn){
      let idx: number = this.auth.userDetails!.favourites.findIndex((ele: number) => ele == id)
      return idx;
    }
    return -1;
  }

  // USE USERDETAILS INTERFACE TO CHECK
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
    // if (this.cartContent == null)
    //   return false
    // let idx = this.cartContent.findIndex((e : number) => e == id)
    // return (idx == -1) ? false : true;
  }

  // USER USERDETAILS TO CHECK
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

    // let favContent: Array<number> = this.getFavArray()

    // let idx: number = favContent.findIndex((ele: number) => ele == id)

    // if (idx == -1){
    //   if (check){
    //     favContent.push(id)
    //   }
    // } else {
    //   if (!check){
    //     favContent.splice(idx, 1);
    //   }
    // }

    // localStorage.setItem('art-cart', JSON.stringify(favContent))
  }

  

}
