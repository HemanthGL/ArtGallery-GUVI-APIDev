import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ArtsService } from 'src/app/services/arts.service';
import { IMG_API_PRE, IMG_API_SUF } from 'src/constants/constants';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent {

  searchVal = new FormControl('')

  queryVal: string;
  page_no: number = 1;
  page_size: number = 6;
  page_array: Array<number> = [6, 8, 12, 24]
  total: number = 100;

  showFirst: Boolean = false;

  constructor(private artServ: ArtsService){
    this.getData();
    this.queryVal = ""
  }

  /**
   * 
   * @param event Keypress on search on any key is reflected as an event
   * @description updated the query value upon each keypress into the search bar
   */
  updateSearch(event:KeyboardEvent):void {
    
    this.queryVal = this.searchVal.value!;
    this.page_no = 1
    this.getData()
  }


  artData:any;

  /**
   * @description gets the data from the API by subscribing to observable returned from API call, called in the service
   */
  getData(){
    // this.artData;
    this.artServ.getAPIData(this.queryVal, this.page_no, this.page_size).subscribe((data:any) => {
      this.artData = data.data
      this.total = data.pagination.total

    });
  }

  /**
   * 
   * @param event handles all page events on the paginator from Material
   * @description updates the paginator with the page events occurred
   */
  handlePageEvent(event: PageEvent){
    this.page_no = event.pageIndex + 1
    this.page_size = event.pageSize
    this.getData()
  } 

}
