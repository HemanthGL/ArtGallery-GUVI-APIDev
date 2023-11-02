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

  // dataLoaded!: Promise<boolean>;

  constructor(private artServ: ArtsService){
    this.getData();
    this.queryVal = ""
  }

  updateSearch(event:KeyboardEvent):void {
    
    this.queryVal = this.searchVal.value!;
    this.page_no = 1
    this.getData()
    // this.handlePageEvent()
  }

  ngAfterViewInit(){
    
  }
  artData:any;
  getData(){
    // this.artData;
    this.artServ.getAPIData(this.queryVal, this.page_no, this.page_size).subscribe((data:any) => {
      this.artData = data.data
      this.total = data.pagination.total

    });
  }
  handlePageEvent(event: PageEvent){
    this.page_no = event.pageIndex + 1
    this.page_size = event.pageSize
    this.getData()
  } 

}
