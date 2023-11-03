import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { IUserDet } from 'src/interfaces/IUserDet';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  
  favouritesArray: Array<number>;
  
  favData: Array<any> = [];

  isEmptyFav: boolean = true;

  constructor(private favServe: CartService, private router: Router, private cartServe: CartService, private auth: AuthService){
    this.favouritesArray = cartServe.getFavArray();

    if (!auth.isLogIn){
      alert('User Not Logged In. Log In to view your Favourites')
      router.navigate(['/home'])
    } else {
      this.favouritesArray = auth.userDetails!.favourites;
      // Conditional Render of Empty Favourites
      if (this.favouritesArray){
        this.isEmptyFav = false;
      }
    }

  }

  /**
   * @description gets the art data of ids in the favourites array on initialisation of component
   */
  ngOnInit(){
    this.getData()
  }


  /**
   * @description gets the data from the API for each ID stored in Favourites array
   */
  getData(){
    
    let art: any;
    
    // embed in for array for each in array
    for (let id of this.favouritesArray){
      this.cartServe.getFavData(id).subscribe((data: any) => {
        art = data.data
        this.favData.push(art)
      })

    }
  }

}
