import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { IMG_API_PRE, IMG_API_SUF } from 'src/constants/constants'


@Component({
  selector: 'app-art-view',
  templateUrl: './art-view.component.html',
  styleUrls: ['./art-view.component.scss']
})
export class ArtViewComponent {

  // use snapshot
  imgURL?: string;

  artId: number;

  artData: any; // replace with interface
  constructor(private cartServ: CartService, private activeRoute: ActivatedRoute){

    this.artId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(){
    this.cartServ.getArtViewData(this.artId).subscribe((data: any) => {
      
      let parsedData: any = data.data;
      this.artData = parsedData;

      // Image URL
      this.imgURL = IMG_API_PRE + this.artData.image_id + IMG_API_SUF

      // Art Description
      let descrip: string = this.artData.description
      
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
        this.artData.place_of_origin = 'Not Available'
      }
      // Dimensions
      if (!this.artData.Dimensions){
        this.artData.Dimensions = "Not Available"
      }
      // medium display
      if (!this.artData.medium_display){
        this.artData.medium_display = "Not Available"
      }
      // department_title
      if (!this.artData.department_title){
        this.artData.department_title = "Not Available"
      }
      // artitst_title

      // publication_history
      if (!this.artData.publication_history){
        this.artData.publication_history = "Not Available"
      }
      // exhibition_history
      if (!this.artData.exhibition_history){
        this.artData.exhibition_history = "Not Available"
      }
      // credit_line
      if (!this.artData.credit_line){
        this.artData.credit_line = "Not Available"
      }
    }

    )
  }

}
