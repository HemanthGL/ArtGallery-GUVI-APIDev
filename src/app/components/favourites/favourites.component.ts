import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private favServe: CartService, private router: Router, private cartServe: CartService, private auth: AuthService){
    this.favouritesArray = cartServe.getFavArray();

    if (!auth.isLogIn){
      alert('User Not Logged In. Log In to view your Favourites')
      router.navigate(['/home'])
    } else {
      this.favouritesArray = auth.userDetails!.favourites;
      // Conditional Render of Empty Favourites
    }

  }

  ngOnInit(){
    this.getData()
  }

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
