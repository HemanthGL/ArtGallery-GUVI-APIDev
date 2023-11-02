import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { IMG_API_PRE, IMG_API_SUF } from 'src/constants/constants';
import { ICardDet } from 'src/interfaces/ICardDet';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() art!: ICardDet

  showSpinner: boolean = false;
  showFirst: Boolean = true;
  // this.cartServe.checkInCart(this.art.id!); // update based on localstorage
  img_src_pre: string = IMG_API_PRE;
  img_src_suf: string = IMG_API_SUF;

  constructor(private cartServe: CartService, public auth: AuthService, private fav: CartService) {

    // initialising like/notLiked status
   
    if (!auth.isLogIn)
      this.showFirst = true;
    else{
      try{
        if (this.art != undefined){
          if (fav.checkInFav(this.art.id))
            this.showFirst = false;
          else
            this.showFirst = true;
        }
      } catch(e: any){
        console.warn('error found', e)
      }
    }
  }
  ngOnInit(){
    if (!this.auth.isLogIn){
      this.showFirst = false
    }
   
    this.showFirst = this.cartServe.checkInFav(this.art.id)
  }

  favToggle(event: MouseEvent){
    if (!this.auth.isLogIn){
      this.showFirst = false
      alert('User Not Logged In')
    } else {
      this.cartServe.toggleToFav(this.art.id);
      if (this.fav.checkInFav(this.art.id))
        this.showFirst = true;
      else 
        this.showFirst = false
    }
  }

  toggleImgFailMode(){
    this.showSpinner = true;
  }

  share(id: number){
    if(navigator.share){
      navigator.share({
        title:"Checkout",
        text:"Check this art",
        url:`${window.location.origin}/view/${id}`
      })
    }
  }
}
