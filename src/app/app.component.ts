import { Component } from '@angular/core';
import { ArtsService } from './services/arts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ArtGallery';

  constructor(private artServ: ArtsService){

  }
  ngOnInit(){
    this.getData();
  }
  artData:any;
  getData(){
    this.artData = this.artServ.getAPIData().subscribe((data:any) => {
      console.log(data)
      console.log('in subs')
      this.artData = data.data
      // this.dataload = data.data;
      // console.log('data load: ', this.dataload)
      // return data.data;
    });
    console.log('data is : ', this.artData)
  }
}
