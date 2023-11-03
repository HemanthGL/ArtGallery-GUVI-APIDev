import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private fav: CartService){}

  /**
   * @description handles the logout, by clearing the userDetails storage, updating the login status state, etc.
   */
  logOut():void{
    if (!this.auth.isLogIn){
      console.warn('Bug in navbar, logout appearing when no needed')
    } else {
      this.auth.isLogIn = false;
      this.auth.reloadToStorage()
      this.auth.userDetails = null;
    }
  }
}
