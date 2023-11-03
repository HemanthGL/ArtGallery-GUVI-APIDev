import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { IMG_API_PRE, IMG_API_SUF, NA } from 'src/constants/constants'
import { IAPIResp } from 'src/interfaces/IAPIResp';
import { ICardDet } from 'src/interfaces/ICardDet';
import { IUserDet } from 'src/interfaces/IUserDet';


@Component({
  selector: 'app-art-view',
  templateUrl: './art-view.component.html',
  styleUrls: ['./art-view.component.scss']
})
export class ArtViewComponent {

  
  imgURL?: string;

  artId: number;

  artData!: ICardDet; // replace with interface

  constructor(private cartServ: CartService, private activeRoute: ActivatedRoute){

    this.artId = this.activeRoute.snapshot.params['id'];
  }

  /**
   * @description intializing the HTML template conditionally based on whether fields are null or not
   */
  ngOnInit(){
    this.cartServ.getArtViewData(this.artId).subscribe((data: any) => {
      
      let parsedData: ICardDet = data.data;
      this.artData = parsedData;

      // Image URL
      this.imgURL = IMG_API_PRE + this.artData.image_id + IMG_API_SUF

      // Art Description
      let descrip: string | undefined = this.artData.description
      
      if (descrip != null){
        descrip = descrip.replace('\n', '<br>')
        document.getElementById('desc')!.innerHTML = descrip
      } else {
        document.getElementById('desc')!.innerHTML = "Description Unavailable"
      }

      // Artist Display
      let artist_disp: string = this.artData.artist_display
      
      if (artist_disp != null){
        artist_disp = artist_disp.replace('\n', '<br>')
        document.getElementById('artist_disp')!.innerHTML = artist_disp
      } else {
        document.getElementById('artist_disp')!.innerHTML = "Artist Details Unavailable"
      }

      // Place of Origin
      if (!this.artData.place_of_origin){
        this.artData.place_of_origin = NA
      }
      // Dimensions
      if (!this.artData.Dimensions){
        this.artData.Dimensions = NA
      }
      // medium display
      if (!this.artData.medium_display){
        this.artData.medium_display = NA
      }
      // department_title
      if (!this.artData.department_title){
        this.artData.department_title = NA
      }
      // artitst_title

      // publication_history
      if (!this.artData.publication_history){
        this.artData.publication_history = NA
      }
      // exhibition_history
      if (!this.artData.exhibition_history){
        this.artData.exhibition_history = NA
      }
      // credit_line
      if (!this.artData.credit_line){
        this.artData.credit_line = NA
      }
    }

    )
  }

}
